import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Point, PointDocument } from './schemas/points.schema';
import { getNewTokenData } from './requests';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Point.name) private pointsModel: Model<PointDocument>,
  ) {}

  async getUsersPoints(user: string) {
    const pointData = await this.pointsModel.findOne({ address: user });

    return pointData;
  }

  async updateUserPoint(user: string, points: number) {
    const pointData = await this.pointsModel.findOneAndUpdate(
      { address: user },
      { points, lastUpdatedExternalAt: Date.now() },
      { new: true },
    );

    return pointData;
  }

  async updateAllUsers() {
    const length = await this.pointsModel.countDocuments();
    let chunk = length % 100; // 1 - n // divide into chunks to save memory
    let count = 0; //0 - n-1

    while (count < chunk) {
      const users = await this.pointsModel
        .find({})
        .skip(count * 100)
        .limit(100);

      for (let i = 0; i < users.length; i++) {
        this.updateUser(users[i]);
      }

      count++;
    }
  }

  async updateUser(user: PointDocument) {
    const newData = await getNewTokenData(user.address);
    const userData = newData.data.user[0];

    let linearScale = 0;

    // the points here is the source of truth, so if oldPoints from external doesn't match
    if (user.points != userData.oldPoints) {
      linearScale = user.points - userData.oldPoints;
    }

    const points = userData.oldPoints + linearScale + userData.pointDifference;

    await this.updateUserPoint(user.address, points);

    // return users;
  }
}
