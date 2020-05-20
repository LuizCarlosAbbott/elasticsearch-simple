import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  // async getAll('/all')

  async getHello(): Promise<any> {
    // const result = await this.elasticsearchService.search({ index: '*' });
    // console.log(result.body.took, result.body.hits.hits);
    // return result.body.hits.hits;

    // const result = await this.elasticsearchService.create({
    //   index: 'nest',
    //   id: '3',
    //   body: { lib: 'elastic', teste: true, value: 10, number: 3 },
    // });
    // console.log(result);
    // return result.body;

    // const result = await this.elasticsearchService.update({
    //   index: 'nest',
    //   id: '1',
    //   body: { lib: 'elastic', teste: true, value: 10, number: 1 },
    // });

    await this.elasticsearchService.index({
      index: 'nest_teste_update',
      id: '1',
      body: {
        teste: 'Inalterado',
        times: 0,
      },
    });

    await this.elasticsearchService.update({
      index: 'nest_teste_update',
      id: '1',
      body: {
        script: {
          lang: 'painless',
          source: `
            ctx._source["teste"] = "Alterado"; 
            ctx._source["times"] = 3
          `,
        },
      },
    });

    const { body } = await this.elasticsearchService.get({
      index: 'nest_teste_update',
      id: '1',
    });

    // console.log(body);
    console.log(body);
    return body;
  }
}
