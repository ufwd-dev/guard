# guard

## Configuration

1. posterOptions

| Name | Type |Description |
| -- | -- | -- |
| host | String | The hostname of the sender you are connecting to. |
| port | Number | The port number to connect to. |
| secure | Boolean |  If true the connection will use TLS when connecting to server. If false then TLS is used if server supports the STARTTLS extension. |
| auth | Object | The authentication data. |

[reference](https://github.com/nodemailer/nodemailer-wellknown/blob/master/services.json)


2. recipients

| Name | Type |Description |
| -- | -- | -- |
| recipients | Array | Mail recipients |

3. databaseOptions

| Name | Type |Description |
| -- | -- | -- |
| host | String | The hostname of the database you are connecting to. |
| port | Number | The port number to connect to. |
| user | String | The MySQL user to authenticate as. |
| password | String | The password of that MySQL user. |
| database | String | Name of the database to use for this connection |

4. checkPeriod

| Name | Type |Description |
| -- | -- | -- |
| checkPeriod | Number | Check program startup cycle. The value represent days. (Default: 7) |