const { AWS } = require('aws-sdk');
const sharp = require('sharp');

const { S3Client,
  GetObjectCommand,
  PutObjectCommand
} = require('@aws-sdk/client-s3');
const s3Client = new S3Client({region: 'ap-northeast-2'});


exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name;
  const Key = decodeURIComponent(event.Records[0].s3.object.key);
  console.log(Bucket, Key)
  const filename = Key.split('/')[Key.split('/').length-1];
  const ext = Key.split('.')[Key.split('.').length-1].toLowerCase();
  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext;
  console.log('filename', filename, 'ext', ext)

  try {
    const getObjectParams = {Bucket, Key};
    const s3Object = await s3Client.send(new GetObjectCommand(getObjectParams));
    const buffer = await new Promise((resolve, reject) => {
      const chunks = [];
      s3Object.Body.on('data', chunk => chunks.push(chunk));
      s3Object.Body.on('error', reject);
      s3Object.Body.on('end', () => resolve(Buffer.concat(chunks)));
    });

    console.log('original', buffer.length);

    const resizedImage = await sharp(buffer)
      .resize(400,400, { fit: 'inside'})
      .toFormat(requiredFormat)
      .toBuffer();

    const putObjectParams = {
      Bucket,
      Key: `thumb/${filename}`,
      Body: resizedImage,

    };
    await s3Client.send(new PutObjectCommand(putObjectParams));
    console.log('put', resizedImage.length);
    return callback(null, `thumb/${filename}`)

  } catch(error) {
    console.error(error)
    return callback(error)
  }

}
