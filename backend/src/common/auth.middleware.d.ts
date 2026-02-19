import type { Response, NextFunction } from 'express';
export declare const protect: (req: any, res: Response, next: NextFunction) => void;
export declare const restrictTo: (...roles: string[]) => (req: any, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map