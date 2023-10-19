import { BadRequestException } from '@nestjs/common';
import toArray from './toArray';
export const bodyRequired = <Type>(body: Type[] | Type) => {
  const bodyArray = toArray(body);

  if (!bodyArray.length) throw new BadRequestException('Body required.');
};
