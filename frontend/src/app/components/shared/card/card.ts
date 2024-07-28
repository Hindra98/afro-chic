import cardContent from "./card-content";
import cardFooter from "./card-footer";
import cardHeader from "./card-header";

class card {
  private header: cardHeader;
  private footer: cardFooter;
  private content: cardContent;
 
  constructor(header: cardHeader=null, footer: cardFooter=null, content: cardContent=null) {
    this.setHeader(header);
    this.setFooter(footer);
    this.setContent(content);
  }

  setHeader(header: cardHeader) { this.header = header; }
  setFooter(footer: cardFooter) { this.footer = footer; }
  setContent(content: cardContent) { this.content = content; }
  
}

export default card