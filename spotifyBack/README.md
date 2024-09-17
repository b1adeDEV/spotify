**GET /artists** - получить список исполнителей.


**POST /artists** - создать исполнителя
```
Отправлять через formData
{
    name:string
    image:File,
    information:string
}
```

**GET /albums** - получить все альбомы. GET /albums?artist=... - получить список альбомов конкретного исполнителя.

**POST /albums** - создать альбом
```
Отправлять через formData
{
    name: string,
    artist: number,(ID atrist)
    year: string,
    image: file
}
```

**GET /albums/:id** - получить информацию о конкретном альбоме, включая информацию о его исполнителе.

**GET /tracks** - получить все треки. GET /tracks?album=... - получить список треков в конкретном альбоме

**POST /tracks** - создать трек

```
{
    name: string
    albums:number
    duration: string
}
```

**POST /users** - регистрация (создание) нового пользователя
```
{
    username:string
    password:string
}
```

**POST /users/sessions** - логин пользователя

```
{
    username:string
    password:string
}
```


**DELETE /users/logout** - logout пользователя

```
Headers {
    Authorization: "YOUR AUTHORIZATION TOKEN"
}
```


**POST /track_history** - Записать прослушанный трек в историю

```
В header указать Authorization: 'токен получанный из логина'
{
    track:number (ID track)
}
```

Для запуска фикстур:

Перейти в папку spotifyBack
    
    npm install
    npm run seed
    