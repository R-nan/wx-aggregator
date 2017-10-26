### App architecture

```
     AGGREGATOR λ EXECUTES AFTER API λS HAVE
     POPULATED THEIR JSONS. FOR EVERY ZIP, IT
     SUMS AND AVERAGES THE FORECAST DATA POINTS
     FROM EACH FORECAST API SOURCE AND OUTPUTS
     THAT TO DATA TO A NEW JSON

                +----------------+                        SEARCH λ TAKES IN A
                |                |                        ZIP SEARCH TERM AND
          +-----+  AGGREGATOR λ  <------+                 REFERENCES IT AGAINST
          |     |                |      |                 THE JSON FOR EACH
          |     +----------------+      |                 FORECAST API SOURCE
          |                             |                 AS WELL AS THE
          |                             |                 AGGREGATE AVERAGE.
          |   +---------------------------------------+   IT PASSES THIS JSON               CLIENT (ALSO ON S3)
          |   |                         |             |   TO THE CLIENT APP'S
          |   |    S3 BUCKET (JSON OBJS)|             |   REACT COMPONENTS FOR    X+-----------------------------------+X
          |   |                         |             |   RENDERING.              +                                     +
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
|   |          |        |                     |   |        +------+---+        +------->    EACH FORECAST SOURCE   |    |
|   | ZIPCODES |        |                     |   |               |            |  |    |                           |    |
|   |          |        +---------------^-----+   |               |            |  |    +---------------------------+    |
|   +-+--------+                        |         |               |            |  |    |                           |    |
|     |                                 |         |               |            +------->    AGGREGATOR COMPONENT   |    |
+     |                                 |         |               |               |    |                           |    |
X+------------------------------------------------+               |               |    +---------------------------+    |
      |                                 |                         |               |                                     |
      |                                 |                         |               +                                     +
      |                                 |                         |               X+-----------------------------------+X
      |                                 |                         |
      |                            +----+-----+                   |
      |                            |          |                   |
      +---------------------------->  API λS  <-------------------+
                                   |          |
                                   +--+---^---+
                                      |   |         API λS ARE TRIGGERED IF SEARCH DOESN'T
                                      |   |         FIND AN EXISTING FORECAST JSON FOR THE
                                      |   |         SUBMITTED ZIP CODE THAT'S LESS THAN 6
                                      |   |         HOURS OLD. IF SUCH A FILE ALREADY EXISTS,
                               +------v---+------+  NO ADDITIONAL API CALLS ARE NEEDED.
                               |                 |
                               |                 |
                               |  EXTERNAL APIS  |
                               |                 |
                               |                 |
                               +-----------------+

```
