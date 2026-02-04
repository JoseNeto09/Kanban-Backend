import jwt from "jsonwebtoken";
export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }
    const [, token] = authHeader.split(" ");
    if (!token) {
        return res.status(401).json({ error: "Token inválido" });
    }
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: "JWT_SECRET não configurado" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // ✅ solução simples e funcional
        req.userId = decoded.id;
        return next();
    }
    catch {
        return res.status(401).json({ error: "Token inválido" });
    }
}
