class ErrorCatcher {
  static new() {
    return new ErrorCatcher();
  }

  handleError(err, _, res, __) {
    const errorResponse = err.response ? err.response.data : null;
    console.error(errorResponse || err.message || 'Unknown error!');
    res.status(400);
    res.send(`Error: ${err.message || 'Unknown!'}`);
  }
}

const errorCatcher = ErrorCatcher.new();
module.exports = {errorCatcher};