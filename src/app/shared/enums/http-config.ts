import { HttpHeaders } from '@angular/common/http';

export enum ContentType {
    JSON = 'application/json',
    TEXT = 'text/plain'
}

export enum ResponseType {
    JSON = 'json',
    TEXT = 'text',
    BLOB = 'blob'
}

export const JsonHeaders = new HttpHeaders({ 'Content-Type': ContentType.JSON });
export const TextHeaders = new HttpHeaders({ 'Content-Type': ContentType.TEXT });