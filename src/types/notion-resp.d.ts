declare module "Type-notion" {
  interface NotionRespose {
    object: "strng";
    id: "strng";
    created_time: "strng";
    last_edited_time: "strng";
    created_by: any;
    last_edited_by: any;
    cover: "strng" | null;
    icon: "strng" | null;
    parent: any;
    archived: "boolean";
    properties: any
    url: "strng";
  }
}
