import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestPoint, PointDocument } from './schemas/points.schema';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(TestPoint.name) private pointsModel: Model<PointDocument>,
  ) {}
  // This function serves as a starting point and example for understanding how OTC market data would be created by the Mystic Team.
  // While we will handle the creation of the OTC market itself, the data you provide should match the data below and will be crucial for populating and utilizing this function effectively.
  async createOTCMarket() {
    try {
      const url = `${process.env.MYSTIC_API_URL}/otc/create-market`;
      console.log(url);

      const request = await axios.post(
        url,
        {
          name: 'Main Test OTC',
          ticker: 'OT',
          chainId: 81457,
          pointsUrl: 'http://localhost:3001/otc-points', //this is very important as it is the url our backend queries to get the point, the format is "${base url + route}/{userAddress}"
          domain: 'localhost',
          tokenUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/768px-Ethereum-icon-purple.svg.png', // this is the url to the icon of the token synbol you want it to be, like showing the bch logo for your token on our market
          multiplier: 1, //considered for increasing points traded on our platform, like users trading their points gets 15% bonus - use 1.15
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${process.env.MYSTIC_ADMIN_KEY}`,
          },
        },
      );

      return request.data;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async getUsersPoints(user: string) {
    const pointData = await this.pointsModel.findOne({
      address: { $regex: user, $options: 'i' },
    });

    if (!pointData) {
      return { points: 0, address: user };
    }

    return { data: pointData };
  }

  async updateAllUsers() {
    const length = await this.pointsModel.countDocuments();
    let chunk = length % 100; // 1 - n // divide into chunks to save memory
    let count = 0; //0 - n-1

    while (count <= chunk) {
      const users = await this.pointsModel
        .find({})
        .skip(count * 100)
        .limit(100);

      for (let i = 0; i < users.length; i++) {
        await this.updateUser(users[i], Math.floor(Math.random() * 100000));
      }

      count++;
    }

    return { message: 'success' };
  }

  async updateUser(user: PointDocument, pointsNumber: number) {
    const newData = await this.getNewTokenData(user.address, pointsNumber);
    const userData = newData.data.user;

    if (!userData) {
      return;
    }

    // let linearScale = 0;

    // // the points here is the source of truth, so if oldPoints from external doesn't match
    // if (user.points != userData.oldPoints) {
    //   linearScale = user.points - userData.oldPoints;
    // }

    const points =
      (+user.points + +userData.pointsDifference) * +userData.multiplier; //multiplier is usually 1 but can be increases for bonus

    await this.updateUserPoint(user.address, points);
  }

  async getNewTokenData(user: string, points?: number) {
    const url = `${process.env.MYSTIC_API_URL}/otc/points-traded?user=${user}&points=`;
    const request = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${process.env.MYSTIC_CLIENT_KEY}`,
      },
    });

    return request.data;
  }

  async updateUserPoint(user: string, points: number) {
    const pointData = await this.pointsModel.findOneAndUpdate(
      { address: user },
      { points, lastUpdatedExternalAt: Date.now() },
      { new: true },
    );

    return pointData;
  }

  async addUser(user: string) {
    const randPoints = Math.random() * 100000;
    let pointData = await this.pointsModel.findOne({ address: user });

    if (pointData) {
      await this.pointsModel.updateOne(
        { address: user },
        { points: +randPoints.toFixed(0) },
        { new: true },
      );
    } else {
      pointData = await this.pointsModel.create({
        address: user,
        points: +randPoints.toFixed(0),
      });
    }

    return pointData;
  }
}
