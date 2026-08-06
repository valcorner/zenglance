import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class B2Service {
  constructor(accessKeyId, secretAccessKey, endpoint, bucket) {
    this.client = new S3Client({
      region: 'auto',
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey
      },
      forcePathStyle: true
    });
    this.bucket = bucket;
  }

  /**
   * Generate a presigned URL for direct client upload
   * Client will PUT directly to B2, Workers never sees the file
   */
  async generateUploadUrl(key, contentType, expiresInSeconds = 3600) {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType
    });

    const signedUrl = await getSignedUrl(this.client, command, {
      expiresIn: expiresInSeconds
    });

    return signedUrl;
  }

  /**
   * Generate a presigned URL for reading (fallback if CDN is unavailable)
   * In production, clients should use Valcorner CDN directly
   */
  async generateReadUrl(key, expiresInSeconds = 3600) {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key
    });

    const signedUrl = await getSignedUrl(this.client, command, {
      expiresIn: expiresInSeconds
    });

    return signedUrl;
  }

  /**
   * Delete a file from B2
   */
  async deleteFile(key) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key
    });

    await this.client.send(command);
  }

  /**
   * Generate B2 object key based on content type and ID
   * Format: {content_type}/{content_id}/{filename}
   */
  static generateObjectKey(contentType, contentId, filename) {
    return `${contentType}/${contentId}/${filename}`;
  }
}
