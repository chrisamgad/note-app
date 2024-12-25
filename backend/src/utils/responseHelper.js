module.exports = {
    success: (res, data, message = 'Request successful', statusCode = 200) => {
      let output = {
        status: 'success',
        message
      };
      if(data){
        output.data = data;
      }

      return res.status(statusCode).json(output);
    },
  
    fail: (res, errorMessage = 'Request failed', statusCode = 500) => {
      return res.status(statusCode).json({
        status: 'fail',
        message: errorMessage
      });
    }
  };
  