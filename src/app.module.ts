import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Point, PointSchema } from './schemas/points.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      // load: [configuration],
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    JwtModule,
    MongooseModule.forFeatureAsync([
      {
        name: Point.name,
        useFactory: () => {
          const schema = PointSchema;
          schema.pre<Point>('save', function (next) {
            this.updatedAt = new Date();
            next();
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
