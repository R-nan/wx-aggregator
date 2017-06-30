# wx-aggregator
A weather forecast aggregator build on NodeJS, Serverless.

## Purpose
Aggregate as many available weather forecast sources as possible in one place.
Starting with NYC metro. We will add more metro areas per demand. 
We will need to consider how to scale due to API rate limits and how many data points we'll be looking for.

## Architecture
Based on the concept here: https://sanderknape.com/2017/05/building-a-serverless-website-in-aws/

```
                                            Aggregator lambda watches for changes in S3,
                                            takes in JSON forecast data, computes a simple
                                            average of it for all ZIPs and dumps back to S3

                                                          +------------+
                                                          |            |
                                                          | Aggregator <-----------+
We will seed with all ZIPs in                             | lambda     +---------+ |
the NYC metro, geocode them to                            |            |         | |
lat/lon pairs which are required                          +------------+        JSON
for API requests                                                                 | |
      +-------------+                                                            | |
      |             |                  +---------------+                   +-----v-+-----+
      |  Scheduled  |                  |               |                   |             |
      |  lambdas    +-----API-GET------> Forecast APIs +-------JSON-------->  S3 bucket  |
      |             |                  |               |                   |             |
      +-------------+                  +---------------+                   +-----^-+-----+
                                                                                 | |
                                                                         HTTP GET| |JSON
                                                                                 | |
                                                                                 | |
                                        +------------+                     +-----+-v-----+
                                        |            +------HTTP-GET+------>             |
                                        |   Client   |                     |  React App  |
                                        |            <----Rendered HTML----+             |
                                        +------------+                     +-------------+

                                   Client hits app, which makes a request for JSON forecast data from S3.
                                   React app parses JSON and renders a static page for the Client's
                                   requested ZIP
```



## Install & Setup

### Requirements
AWS CLI
Python 2 version 2.6.5+ or Python 3 version 3.3

Once installed, contact project owner to obtain AWS keys

