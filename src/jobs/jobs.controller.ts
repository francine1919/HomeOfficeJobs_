import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  UsePipes,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';

import {
  FilterBody,
  IsBoolean,
  IsString,
  JobBody,
  JobId,
  JobIds,
  JobUpdateBody,
  bodyFilter,
  idParam,
  isBoolean,
  isString,
  jobBodyArray,
  jobIds,
  jobUpdateBodyArray,
} from './dto/jobs.request.dto';
import toArray from '../commons/toArray';
import { ZodValidationPipe } from 'nestjs-zod';
import { JobsService } from './jobs.service';
import { Authenticator } from 'src/commons/tokenGenerator';

@Controller('/job')
export class JobsController {
  constructor(
    private readonly appService: JobsService,
    private readonly auth: Authenticator,
  ) {}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/offer/:id')
  @UsePipes(new ZodValidationPipe(idParam))
  async getOneJob(
    @Param('id') id: JobId,
    @Headers('Authorization') authorization: string,
  ) {
    if (!this.auth.verifyTokenData(authorization))
      throw new UnauthorizedException();
    return await this.appService.getOneJob(id);
  }
  @Get('/offers')
  async getJobs(
    @Body() body: JobIds[],
    @Headers('Authorization') authorization: string,
  ) {
    if (!this.auth.verifyTokenData(authorization))
      throw new UnauthorizedException();
    return await this.appService.getJobs(toArray(body));
  }
  @Get('/international')
  @UsePipes(new ZodValidationPipe(isBoolean))
  async getNationalOrInternationalJobs(
    @Body('international') body: IsBoolean,
    @Headers('Authorization') authorization: string,
  ) {
    if (!this.auth.verifyTokenData(authorization))
      throw new UnauthorizedException();
    return await this.appService.getNationalAndInternationalJobs(body);
  }
  @Get('/cities')
  @UsePipes(new ZodValidationPipe(isString))
  async getCities(
    @Body('country') body: IsString,
    @Headers('Authorization') authorization: string,
  ) {
    if (!this.auth.verifyTokenData(authorization))
      throw new UnauthorizedException();
    return await this.appService.getCities(body);
  }
  @Get('/countries')
  async getCountries(@Headers('Authorization') authorization: string) {
    if (!this.auth.verifyTokenData(authorization))
      throw new UnauthorizedException();
    return await this.appService.getCountries();
  }
  @Get('/total')
  async getSumJobsPerCountry(@Headers('Authorization') authorization: string) {
    if (!this.auth.verifyTokenData(authorization))
      throw new UnauthorizedException();
    return await this.appService.getTotalJobsPerCountry();
  }
  @Post('/create')
  @UsePipes(new ZodValidationPipe(jobBodyArray))
  async createJobs(
    @Body() body: JobBody[],
    @Headers('Authorization') authorization: string,
  ): Promise<void> {
    if (!this.auth.verifyTokenData(authorization))
      throw new UnauthorizedException();
    return await this.appService.createJobs(toArray(body));
  }
  @Put('/update')
  @UsePipes(new ZodValidationPipe(jobUpdateBodyArray))
  async updateJobs(
    @Body() body: JobUpdateBody,
    @Headers('Authorization') authorization: string,
  ): Promise<void> {
    if (!this.auth.verifyTokenData(authorization))
      throw new UnauthorizedException();
    return await this.appService.updateJobs(body);
  }
  @Post('/filter')
  @UsePipes(new ZodValidationPipe(bodyFilter))
  async filterJobs(
    @Body() body: FilterBody,
    @Headers('Authorization') authorization: string,
  ) {
    if (!this.auth.verifyTokenData(authorization))
      throw new UnauthorizedException();
    return this.appService.filterJobs(body);
  }
  @Delete('/delete')
  @UsePipes(new ZodValidationPipe(jobIds))
  async deleteJobs(
    @Body() body: JobIds,
    @Headers('Authorization') authorization: string,
  ): Promise<void> {
    if (!this.auth.verifyTokenData(authorization))
      throw new UnauthorizedException();
    return await this.appService.deleteJobs(toArray(body));
  }
}
