import { Page } from 'playwright';

export class PostsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clicAdd(){
    await this.page.click('.addlink');
  }
  async writeTitle(title: string) {
    await this.page.fill('input[name="title"]', title);
  }
  async writeContent(content: string) {
    await this.page.fill('textarea[name="content"]', content);
  }
  async clicSave(){
    await this.page.click('input[name="_save"]');
  }
  async clicSaveAddAnother(){
    await this.page.click('input[name="_addanother"]');
  }
  async isPostAdded(): Promise<boolean> {
    return await this.page.isVisible('.success')
  }

  
  
}