import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CommonModule } from './common/common.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [PostsModule, CommonModule, ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
