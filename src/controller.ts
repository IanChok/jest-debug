import { MongoClient, Db } from 'mongodb';

const usernameDb = process.env.MONGODB_USERNAME;
const passwordDb = process.env.MONGODB_PASSWORD;
const url = `mongodb+srv://${usernameDb}:${passwordDb}@cluster0-jlp3r.mongodb.net/test?retryWrites=true&w=majority`;

class Controller {
    private dbInstance: Db = undefined;
    private dbName: string = undefined;
    private collectionName: string = undefined;

    constructor(dbName = '...', collectionName = '...') {
        this.dbName = dbName;
        this.collectionName = collectionName;
        this.connectToDb(1, 3);
    };

    public getdbName(){
        return this.dbName;
    }

    // This method is causing the error
    private connectToDb(currentAttempt: number, maxAttempt: number) {
        const mongoClient = new MongoClient(url, { useUnifiedTopology: true });
        mongoClient.connect().then(() => {
            console.log(`Connected to ${this.dbName} as ${usernameDb}`)
            this.dbInstance = mongoClient.db(this.dbName);
        }).catch((err) => {
            if (currentAttempt <= maxAttempt) {
                this.connectToDb(currentAttempt + 1, maxAttempt);
            } else {
                console.error(err);
                process.exit(1);
            }
        })
    }
}

export default new Controller();
