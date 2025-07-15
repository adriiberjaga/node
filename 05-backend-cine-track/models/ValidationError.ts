import {z, ZodError } from "zod/v4";

export default class ValidationError extends Error {
    constructor(error: ZodError) {
        const prettyfiedError = z.prettifyError(error);
        super(prettyfiedError)
    }
}