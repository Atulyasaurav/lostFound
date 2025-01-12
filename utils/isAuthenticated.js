exports.isAuthenticated = (req, res, next) => {
    // Get token and refreshToken from cookies
    const token = req.cookies.token;
    const refreshToken = req.cookies.refreshToken;

    console.log("Token from cookies:", token);
    console.log("Refresh Token from cookies:", refreshToken);

    // Check if both token and refreshToken exist
    if (token && refreshToken) {
        console.log("Both token and refreshToken are present. User authenticated.");
        req.user = { token, refreshToken };
        return next();
    }

    console.log("Missing token or refreshToken. Redirecting to login.");
    res.redirect('/');
};
