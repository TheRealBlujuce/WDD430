
export class Contact{
    public id: number;
    public name: string;
    public email: string;
    public phone: string;
    public imageURL: string;
    public group: Array<Contact>;

    constructor(cid: number, cname: string, cemail: string, cphone: string, cimageURL: string, cgroup: Array<Contact>)
    {
        this.id = cid;
        this.name = cname;
        this.email = cemail;
        this.phone = cphone;
        this.imageURL = cimageURL;
        this.group = cgroup;
    }
    
    
}