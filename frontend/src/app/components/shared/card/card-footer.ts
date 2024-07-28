class cardFooter {
  private texte: string;
  private link: ParamsLink;
  private buttons: ParamsButton[];

  constructor(texte: string = "", link: ParamsLink = null, buttons: ParamsButton[] = []) {
    this.setTexte(texte);
    this.setLink(link);
    this.setButtons(buttons);
  }

  getTexte(): string {
    return this.texte;
  }
  setTexte(texte: string) {
    this.texte = texte;
  }
  getLink(): ParamsLink {
    return this.link;
  }
  setLink(link: ParamsLink) {
    this.link = link;
  }
  getButtons(): ParamsButton[] {
    return this.buttons;
  }
  setButtons(buttons: ParamsButton[]) {
    this.buttons = buttons;
  }
}

export default cardFooter;
