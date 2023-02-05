export class Message{
    public id: string;
    public subject: string;
    public msgText: string;
    public sender: string;


    constructor(m_id: string, m_subject: string, m_msgText: string, m_sender: string)
    {
        this.id = m_id;
        this.subject = m_subject;
        this.msgText = m_msgText;
        this.sender = m_sender;
    }
    
    
}