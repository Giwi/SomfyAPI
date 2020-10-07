<a name="top"></a>
# Somfy API v1.0.0

Somfy Home Protect Rest API

 - [Device](#Device)
   - [Get device detail](#Get-device-detail)
   - [Get site devices](#Get-site-devices)
 - [Security](#Security)
   - [Get the current security level](#Get-the-current-security-level)
   - [Set the security level](#Set-the-security-level)
 - [Site](#Site)
   - [Get site detail](#Get-site-detail)
   - [List your registered sites](#List-your-registered-sites)

___


# <a name='Device'></a> Device

## <a name='Get-device-detail'></a> Get device detail
[Back to top](#top)

```
GET /site/:siteId/device/:deviceId
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| siteId | `String` | <p>Site ID.</p> |
| deviceId | `String` | <p>Device ID.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| devices | `Object` | <p>A Device object</p> |

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

# <a name='Security'></a> Security

## <a name='Get-the-current-security-level'></a> Get the current security level
[Back to top](#top)

```
GET /site/:siteId/security/state
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| siteId | `String` | <p>Site ID.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| level | `String` | <p>Security level in 'disarmed' | 'armed' | 'partial'.</p> |

## <a name='Set-the-security-level'></a> Set the security level
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

# <a name='Site'></a> Site

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
