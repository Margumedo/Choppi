import { Controller, Post, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { QuoteCartDto } from './dto/quote-cart.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Post('quote')
    @ApiOperation({ summary: 'Calculate cart subtotal' })
    @ApiBody({ type: QuoteCartDto })
    quote(@Body() quoteCartDto: QuoteCartDto) {
        return this.cartService.quote(quoteCartDto);
    }
}
