import { Controller, Get } from '@nestjs/common';

@Controller('')
export class HealthController {
  @Get('')
  getHello() {
    return {
      Message: 'Welcome to the home office jobs API! 🛍️',
      Author: 'Tailored by Francine Lima. 👩💻',
      Github: 'https://github.com/francine1919 🔗',
      Documentation:
        'https://documenter.getpostman.com/view/19296644/2s9YJXakpQ 📋 ',
    };
  }
}
