export class Post {
    id: string;
    author?: number;
    name?: string;
    date?: Date;
    date_gmt?: Date;
    tags: Array<any>;
    categories: Array<any>;
    content?: string;
    title?: string;
    excerpt?: string;
    status?: string;
    comment_status?: string;
    ping_status?: string;
    password?: string;
    to_ping?: string;
    pinged?: string;
    modified?: Date;
    modified_gmt?: Date;
    content_filtered?: string;
    parent?: number;
    guid?: string;
    menu_order?: number;
    type?: string;
    mime_type?: string;
    comment_count?: number;
  }