import type { NextFunction, Request, Response } from 'express';
export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: any;
}
export declare const successResponse: (res: Response, data: any, message?: string, code?: number) => Response<any, Record<string, any>>;
export declare const errorResponse: (res: Response, message?: string, code?: number, errors?: null) => Response<any, Record<string, any>>;
export declare const errorHandler: (err: any, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export declare class AppError extends Error {
    statusCode: number;
    errors: any;
    constructor(message: string, statusCode?: number, errors?: null);
}
//# sourceMappingURL=response.d.ts.map