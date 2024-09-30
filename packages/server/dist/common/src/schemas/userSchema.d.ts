import { z } from "zod";
export declare const userSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    email: string;
}, {
    id: string;
    name: string;
    email: string;
}>;
export type User = z.infer<typeof userSchema>;
//# sourceMappingURL=userSchema.d.ts.map