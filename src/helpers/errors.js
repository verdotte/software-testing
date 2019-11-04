class errors {
  static errorResponse(res, error) {
    return res.status(401).json({
      status: 401,
      message: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
}

export default errors;
