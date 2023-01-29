export class Document{
    
    public id: number;
    public name: string;
    public description: string;
    public url: string;
    public children: Array<Document>;

    constructor(d_id: number, d_name: string, d_description: string, d_url: string, d_group: Array<Document>)
    {
        this.id = d_id;
        this.name = d_name;
        this.description = d_description;
        this.url = d_url;
        this.children = d_group;
    }
    
    
}