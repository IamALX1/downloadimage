exports.handler = async (event, context) => {
  const url = event.queryStringParameters.url;
  
  if (!url) {
    return {
      statusCode: 400,
      body: 'URL parameter required'
    };
  }

  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Disposition': 'attachment; filename="download"',
        'Content-Type': response.headers.get('content-type') || 'application/octet-stream'
      },
      body: Buffer.from(buffer).toString('base64'),
      isBase64Encoded: true
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error fetching file'
    };
  }
};