### App architecture

```
     AGGREGATOR λ EXECUTES AFTER API λS HAVE
     POPULATED THEIR JSONS. FOR EVERY ZIP, IT
     SUMS AND AVERAGES THE FORECAST DATA POINTS
     FROM EACH FORECAST API SOURCE AND OUTPUTS
     THAT TO DATA TO A NEW JSON

                +----------------+
                |                |
          +-----+  AGGREGATOR λ  <------+
          |     |                |      |
          |     +----------------+      |
          |                             |
          |                             |
          |   +---------------------------------------+                                     CLIENT (ALSO ON S3)
          |   |                         |             |
          |   |    S3 BUCKET (JSON OBJS)|             |                           X-------------------------------------X
          |   |                         |             |                           |                                     |
X+------------------------------------------------+   |                           |      +-----------------------+      |
+         |   |                         |         |   |           +----------------------+     SEARCH INPUT      |      |
|         |   |                         |         |   |           |               |      +-----------------------+      |
|  +------v---v--+                      |         |   |           |               |                                     |
|  |             |                      |         |   |           |               |                                     |
|  |  AGGREGATE  |      +---------------+-----+   |   |           |               |                                     |
|  |             |      |                     |   |   |           |               |                                     |
|  +-------------+      |                     |   |   |    +------v---+           |                                     |
|                       |  INDIVIDUAL JSONS   |   |   |    |          |           |                                     |
|                       |  FOR EACH FORECAST  <-------+----> SEARCH λ +--------+  |    +---------------------------+    |
|   +----------+        |  API SOURCE         |   |        |          |        |  |    |    REACT COMPONENTS FOR   |    |
|   |          |        |                     |   |        +----------+        +------->    EACH FORECAST SOURCE   |    |
|   | ZIPCODES |        |                     |   |                            |  |    |                           |    |
|   |          |        +---------------^-----+   |     SEARCH λ TAKES IN A    |  |    +---------------------------+    |
|   +-+--------+                        |         |     ZIP SEARCH TERM AND    |  |    |                           |    |
|     |                                 |         |     REFERENCES IT AGAINST  +------->    AGGREGATOR COMPONENT   |    |
|     |                                 |         |     THE JSON FOR EACH         |    |                           |    |
X+------------------------------------------------+     FORECAST API SOURCE       |    +---------------------------+    |
      |                                 |               AS WELL AS THE            |                                     |
      |                                 |               AGGREGATE AVERAGE.        |                                     |
      |                                 |               IT PASSES THIS JSON       X-------------------------------------X
      |                                 |               TO THE CLIENT APP'S
      |   +----------+                  |               REACT COMPONENTS FOR
      |   |          |                  |               RENDERING.
      +--->  API λS  +------------------+
          |          |
          +--+---^---+     API λS ITERATE THROUGH ZIPCODES JSON
             |   |         PING INDIVIDUAL FORECAST APIS EVERY
             |   |         3 HOURS AND OUTPUTS A NEW JSON FILE
             |   |         WITH FORECASTS FOR EVERY ZIP FOR EACH
             |   |         FORECAST API SOURCE.
             |   |
      +------v---+------+
      |                 |
      |                 |
      |  EXTERNAL APIS  |
      |                 |
      |                 |
      +-----------------+
```
