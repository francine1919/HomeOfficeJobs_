import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { KnexService } from '../db/knex.service';
import {
  FilterBody,
  JobBody,
  JobId,
  JobIds,
  JobUpdateBody,
} from './dto/jobs.request.dto';
import { Knex } from 'knex';

@Injectable()
export class JobsService {
  constructor(private readonly db: KnexService) {}
  tableJobs = 'JobOffers';

  getHello(): string {
    return `
    Message: Welcome to the home office jobs API! 🛍️,
    Author: Tailored by Francine Lima. 👩💻,
    Github: https://github.com/francine1919 🔗,
    Documentation_link: https://documenter.getpostman.com/view/19296644/2s9YJXakpQ 📋 
`;
  }

  async getOneJob(jobId: JobId) {
    return await this.db.knex
      .select('*')
      .from(this.tableJobs)
      .where('id', jobId);
  }

  async getJobs(jobIds: JobIds[]) {
    let query: Knex.QueryBuilder;
    query = this.db.knex
      .select('*')
      .from(this.tableJobs)
      .orderByRaw("STR_TO_DATE(date, '%d-%m-%Y') DESC");

    if (jobIds.length) query.whereIn('id', jobIds);

    const jobs = await query;
    return jobs;
  }

  async getNationalAndInternationalJobs(inter: boolean) {
    return await this.db.knex
      .select('*')
      .from(this.tableJobs)
      .where('international', inter);
  }

  async getCountries() {
    return await this.db.knex.select('country').from(this.tableJobs);
  }

  async getCities(country: string) {
    const result = await this.db.knex
      .select('country', this.db.knex.raw('GROUP_CONCAT(city) as cities'))
      .from(this.tableJobs)
      .where('country', country.toLowerCase())
      .groupBy('country');

    const response = result.map((data) => ({
      country: data.country,
      cities: data.cities.split(','),
    }));
    return response;
  }

  async getTotalJobsPerCountry() {
    return await this.db.knex
      .select('country')
      .from(this.tableJobs)
      .count('* as jobs')
      .groupBy('country');
  }

  async createJobs(body: JobBody[]) {
    for (const job of body) {
      await this.db.knex
        .insert({
          title: job?.title,
          description: job.description,
          date: job.date,
          jobType: job.jobType,
          requirements: job?.requirements,
          benefits: job?.benefits,
          user: job.user,
          lastUpdated: job.lastUpdated,
          country: job.country,
          city: job.city,
          international: job.international,
          optionals: job?.optionals,
          optionalss: job?.optionalss,
        })
        .into(this.tableJobs);
    }
  }

  async updateJobs(body: JobUpdateBody) {
    if (body.every((id) => body.includes(id))) {
      for (const job of body) {
        await this.db.knex
          .update({
            title: job.title,
            description: job.description,
            date: job.date,
            jobType: job.jobType,
            requirements: job.requirements,
            benefits: job.benefits,
            user: job.user,
            lastUpdated: job.lastUpdated,
            country: job.country,
            city: job.city,
            international: job.international,
            optionals: job.optionals,
            optionalss: job.optionalss,
          })
          .into(this.tableJobs)
          .where('id', job.id);
      }
    } else {
      throw new BadRequestException('Ids are required to updated jobs.');
    }
  }
  async filterJobs(body: FilterBody) {
    let query: Knex.QueryBuilder;
    query = this.db.knex.select('*').from(this.tableJobs);

    if (body.city) query.where('city', body.city);

    if (body.country) query.where('country', body.country);

    if (body.title) {
      const title = body.title?.split(',');
      for (let i = 0; i < title.length; i++) {
        query.orWhere('title', 'like', `%${title[i].toLowerCase().trim()}%`);
      }
    }

    if (body.benefits && body.benefits.length)
      query.whereBetween('benefits', [body.benefits[0], body.benefits[1]]);

    if (body.jobType) query.where('jobType', body.jobType);

    if (body.international) query.where('international', body.international);

    const queryString = query.toString();
    console.log('Generated SQL Query:', queryString);

    const result = await query;
    return result;
  }
  async deleteJobs(jobIds: JobIds[]) {
    const job = await this.db.knex
      .delete()
      .from(this.tableJobs)
      .whereIn('id', jobIds);
    if (!job) throw new NotFoundException('Job not found.');
  }
}
