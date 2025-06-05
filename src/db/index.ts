import { env } from "@/config";
import { connect } from "mongoose";

export class Database {
  private readonly uri: string;

  constructor() {
    this.uri = env.MONGO_URI;
  }
  async connection() {
    try {
      await connect(this.uri);
    } catch (err) {
      console.error("Error due connecting to mongoDB: ", err);
      process.exit(1);
    }
  }
}
