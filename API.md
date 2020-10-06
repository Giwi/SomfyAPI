<a name="top"></a>
# Somfy API v1.0.0

Somfy home Protect Rest API

 - [SomfyAPI](#SomfyAPI)
   - [](#)
   - [Get site detail](#Get-site-detail)
   - [Get site devices](#Get-site-devices)
   - [List your registered sites](#List-your-registered-sites)
   - [Set the security levle](#Set-the-security-levle)

___


# <a name='SomfyAPI'></a> SomfyAPI

## <a name=''></a> 
[Back to top](#top)

```
GET /auth
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| WebPage | `object` | <p>used to authorize your app</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
    "token": {
    "access_token": "xxxxxxxxxxxxxxxxxxxxxxxxx",
    "expires_in": 3600,
    "token_type": "bearer",
    "scope": "user.basic api.full oa.site oa.user oa.device oa.devicedefinition level.0",
    "refresh_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "expires_at": "2020-10-06T21:22:17.708Z"
    }
}
```

## <a name='Get-site-detail'></a> Get site detail
[Back to top](#top)

```
GET /site/:siteId
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| siteId | `String` | <p>Site ID.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| site | `Object` | <p>A site object</p> |

## <a name='Get-site-devices'></a> Get site devices
[Back to top](#top)

```
GET /site/:siteId/device
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| siteId | `String` | <p>Site ID.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| devices | `Object` | <p>A Device list object</p> |

## <a name='List-your-registered-sites'></a> List your registered sites
[Back to top](#top)

```
GET /site
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| sites | `Object[]` | <p>A site list</p> |

## <a name='Set-the-security-levle'></a> Set the security levle
[Back to top](#top)

```
GET /site/:siteId/security/:level
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| siteId | `String` | <p>Site ID.</p> |
| level | `String` | <p>Security level in 'disarmed' | 'armed' | 'partial'.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| status | `Object` | <p>A Status object</p> |
