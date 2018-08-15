export class Post {
    post_id: string;
    post_author?: number;
    post_name?: string;
    post_date?: Date;
    post_date_gmt?: Date;
    post_tags: Array<any>;
    post_categories: Array<any>;
    post_content?: string;
    post_title?: string;
    post_excerpt?: string;
    post_status?: string;
    comment_status?: string;
    ping_status?: string;
    post_password?: string;
    to_ping?: string;
    pinged?: string;
    post_modified?: Date;
    post_modified_gmt?: Date;
    post_content_filtered?: string;
    post_parent?: number;
    guid?: string;
    menu_order?: number;
    post_type?: string;
    post_mime_type?: string;
    comment_count?: number;
  }