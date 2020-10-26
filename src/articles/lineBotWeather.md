# Build a Line Bot With Flask for Weather Forecast

There are already a number of tutorials about how to build a LINE chat bot with Python Flask and how to deploy the APP to Heroku (check References section below) but few of them mention about the implementation details such as customized rich menu and reply messages. I followed those tutorials to built a simple bot with weather forecasting. After reading the tutorials and the official API documents, I successfully create hierarchical rich menus and flex messages as weather card.

## Result Preview
- Hierarchical Rich Menu    
    ![](https://i.imgur.com/b1rTt6Am.png)![](https://i.imgur.com/4Fc6wg1m.png)
- Weeakly Weather forecast for City     
    ![](https://i.imgur.com/NH5m7bum.png)![](https://i.imgur.com/Z0Y0zaRm.png)![](https://i.imgur.com/YTHnAvlm.jpg)
- Current Weather Report fot District   
    ![](https://i.imgur.com/R0Wdbcwm.jpg)![](https://i.imgur.com/4ctVEoWm.png)


## Weather API

After finishing the tutorials about how to building a flask backend server and deploy to Heroku for LINE chat bot, the next step is to obtain the weather forecast information.

Taiwan Central Weather Bureau (CWB) has already built great resources which is [Open Weather Data](https://opendata.cwb.gov.tw/index) for developers. There are comprehensive [API documents and examples](https://opendata.cwb.gov.tw/dist/opendata-swagger.html) for obtaining weather data, just sign up as a member then we could access those weather data for free

The below code is a small part of my code for obtaining weekly weather forecast, we could formulate the response information depending on how we want to show the information. I extract the descriptions of weather and clean up them as several lines in a list here.

```python
def city_weather_forecast_week(city_name, key):
    # obtain data
    url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?"
    url += "Authorization=" + key
    url += "&locationName=" + city_name
    response = requests.get(url)
    report = json.loads(response.text)
    data = report['records']['locations'][0]['location'][0]['weatherElement']
    # parse weather description
    description = [x for x in data if x['elementName'] == 'WeatherDescription'][0]['time']
    description = [x['elementValue'][0]['value'] for x in description]
    temp_description = []
    for line in description:
        line = line.split('。')[:-1]
        # print(line)
        winds = line[-2].split(' ')
        if len(winds) > 2:
            winds = winds[:1] + [winds[1] + winds[2]]
        if "降雨" not in line[1]:
            temp = '降雨機率 ??%'
            line = [line[0], temp] + line[1:-2] + winds + line[-1:]
        else:
            line = line[:-2] + winds + line[-1:]
        temp_description.append(line)
    description = temp_description
    # parse corresponding time of weather description
    time = [x for x in data if x['elementName'] == 'T'][0]['time']
    time = [x['startTime'].replace('-', '/')[:-3] for x in time]
    # combine as result
    result = []
    if int(time[0].split(' ')[-1].split(':')[0]) < 18:
        day_night = ['早', '晚']
    else:
        day_night = ['晚', '早']
    for i in range(len(time)):
        start_weekday = ' ' + DAY_NAME[datetime.datetime.strptime(time[i].split(' ')[0], '%Y/%m/%d').weekday()] + ' '
        start_time = time[i].replace(' ', start_weekday)
        temp = [start_time[5:-5], day_night[i % 2]]
        temp.extend(description[i])
        result.append(temp)
    return result
```

## Line Rich Menu

Next up is to create a rich menu for users so that they could simply press buttons to recieve the weather information.

My first attempt is to create a rich menu by following [the steps here](https://developers.line.biz/en/docs/messaging-api/using-rich-menus/#creating-a-rich-menu-using-the-messaging-api). It is super simple and just takes 4 steps to create a menu.

- Setup the areas (layout) and define the action for each area in a json file
- Upload the json file to LINE to create a rich menu
- Upload the correspoding background image for the rich menu
- Set the default menu by the rich menu ID

After successfully create one, I was wondering if it possible to create a menu with mltiple pages i.e. a hierarchical one. I read the documents carefully and found that one menu with multiple pages not valid. Instead of creating one menu with pages, we should create several menus and link menu to user to achieve a hierarchical-like menu i.e. use `PostbackAction` in menu and call `set_default_menu_user` once server receive the post request.

```python
from linebot.models.rich_menu import RichMenu, RichMenuSize, RichMenuArea, RichMenuBounds
from linebot.models.actions import *


# 2 rows 3 cols
class MainMenu:
    def __init__(self):
        self.width = 800
        self.height = 540
        self.grid = (2, 3)
        self.area1_1 = RichMenuArea(bounds=RichMenuBounds(x=0,
                                                          y=0,
                                                          width=self.width // self.grid[1],
                                                          height=self.height // self.grid[0]),
                                    action=PostbackAction(label='go_weather_menu',
                                                          data='{"command":"go_weather_menu"}'))
        self.area1_2 = RichMenuArea(bounds=RichMenuBounds(x=self.width // self.grid[1],
                                                          y=0,
                                                          width=self.width // self.grid[1],
                                                          height=self.height // self.grid[0]),
                                    action=URIAction(label='default',
                                                     uri='https://yirueilu-b.github.io/YirueiLuBlogGatsby/'))
        self.area1_3 = RichMenuArea(bounds=RichMenuBounds(x=self.height // self.grid[0] * 2,
                                                          y=0,
                                                          width=self.width // self.grid[1],
                                                          height=self.height // self.grid[0]),
                                    action=URIAction(label='default',
                                                     uri='https://yirueilu-b.github.io/YirueiLuBlogGatsby/'))
        self.area2_1 = RichMenuArea(bounds=RichMenuBounds(x=0,
                                                          y=self.height // self.grid[0],
                                                          width=self.width // self.grid[1],
                                                          height=self.height // self.grid[0]),
                                    action=URIAction(label='default',
                                                     uri='https://yirueilu-b.github.io/YirueiLuBlogGatsby/'))
        self.area2_2 = RichMenuArea(bounds=RichMenuBounds(x=self.height // self.grid[0],
                                                          y=self.height // self.grid[0],
                                                          width=self.width // self.grid[1],
                                                          height=self.height // self.grid[0]),
                                    action=URIAction(label='default',
                                                     uri='https://yirueilu-b.github.io/YirueiLuBlogGatsby/'))
        self.area2_3 = RichMenuArea(bounds=RichMenuBounds(x=self.height // self.grid[0] * 2,
                                                          y=self.height // self.grid[0],
                                                          width=self.width // self.grid[1],
                                                          height=self.height // self.grid[0]),
                                    action=URIAction(label='default',
                                                     uri='https://yirueilu-b.github.io/YirueiLuBlogGatsby/'))
        self.menu = self.create_menu()

    def create_menu(self):
        rich_menu_main = RichMenu(
            size=RichMenuSize(width=self.width, height=self.height),
            selected=False,
            name="Main Menu",
            chat_bar_text="主選單",
            areas=[self.area1_1, self.area1_2, self.area1_3, self.area2_1, self.area2_2, self.area2_3]
        )
        return rich_menu_main


# 2 rows 3 cols
class WeatherMenu:
    def __init__(self):
        self.width = 800
        self.height = 540
        self.grid = (2, 3)
        self.area_back = RichMenuArea(bounds=RichMenuBounds(x=self.width // self.grid[1] * 2,
                                                            y=0,
                                                            width=self.width // self.grid[1],
                                                            height=self.height),
                                      action=PostbackAction(label='back_main_menu',
                                                            data='{"command":"back_main_menu"}'))

        self.area1_1 = RichMenuArea(bounds=RichMenuBounds(x=0,
                                                          y=0,
                                                          width=self.width // self.grid[1],
                                                          height=self.height // self.grid[0]),
                                    action=PostbackAction(label='select_region',
                                                          data='{"command":"select_region"}'))
        self.area1_2 = RichMenuArea(bounds=RichMenuBounds(x=self.width // self.grid[1],
                                                          y=0,
                                                          width=self.width // self.grid[1],
                                                          height=self.height // self.grid[0]),
                                    action=PostbackAction(label='share_loc_weather',
                                                          data='{"command":"share_loc_for_weather"}'))
        self.area1_3 = RichMenuArea(bounds=RichMenuBounds(x=0,
                                                          y=self.height // self.grid[0],
                                                          width=self.width // self.grid[1],
                                                          height=self.height // self.grid[0]),
                                    action=MessageAction(label='weather', text='按鈕3'))
        self.area1_4 = RichMenuArea(bounds=RichMenuBounds(x=self.width // self.grid[1],
                                                          y=self.height // self.grid[0],
                                                          width=self.width // self.grid[1],
                                                          height=self.height // self.grid[0]),
                                    action=MessageAction(label='weather', text='按鈕4'))

        self.menu = self.create_menu()

    def create_menu(self):
        rich_menu_weather = RichMenu(
            size=RichMenuSize(width=self.width, height=self.height),
            selected=False,
            name="Weather Menu",
            chat_bar_text="天氣查詢選單",
            areas=[self.area_back, self.area1_1, self.area1_2, self.area1_3, self.area1_4]
        )
        return rich_menu_weather

```

```python
@handler.add(PostbackEvent)
def handle_postback(event):
    post_data = json.loads(event.postback.data)
    if post_data['command'] == 'go_weather_menu':
        set_default_menu_user(rich_menu_data['weather_menu'], event.source.user_id)
    elif post_data['command'] == 'back_main_menu':
        set_default_menu_user(rich_menu_data['main_menu'], event.source.user_id)
```

## Flex Message

LINE provides a super convenient tool called **Flex Message Simulator** for developers to design the layout of messages

![](https://i.imgur.com/cnp6d0q.png)

With the Flex Message Simulator we could design some reply messages with fancy look. I first create a template on the simulator then reconstruct it and tear it into several parts in my code so that the layout could be more easy to be understood. Here is a example.

```python
def current_weather_layout(result, datetime_now, area):
    day_bg_image = "https://i.imgur.com/ABDcFmel.png"
    night_bg_image = "https://i.imgur.com/MTwqLasl.png"
    if 5 < int(datetime_now.split(' ')[1][:2]) < 18:
        background_image = day_bg_image
    else:
        background_image = night_bg_image

    background_image_layout = {
        "type": "image",
        "url": background_image,
        "aspectRatio": "4:3",
        "size": "full",
        "aspectMode": "cover"
    }
    area_layout = {
        "type": "box",
        "layout": "vertical",
        "contents": [
            {
                "type": "text",
                "text": area,
                "size": "lg",
                "weight": "bold",
                "offsetTop": "10px",
                "offsetStart": "20px",
                "color": text_color
            }
        ],
        "position": "absolute",
        "width": "100%",
        "height": "15%",
        "offsetTop": "0px",
        "backgroundColor": "#54545487"
    }
    datetime_now_layout = {
        "type": "box",
        "layout": "vertical",
        "contents": [
            {
                "type": "text",
                "text": datetime_now,
                "size": "sm",
                "offsetEnd": "20px",
                "position": "absolute",
                "offsetBottom": "10px",
                "color": text_color
            }
        ],
        "position": "absolute",
        "width": "100%",
        "height": "15%",
        "offsetBottom": "0px",
    }

    layout = {
        "type": "bubble",
        "size": "giga",
        "hero": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                background_image_layout,
                area_layout,
                datetime_now_layout, {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                        current_weather_icon_layout(result),
                        {
                            "type": "separator",
                            "color": "#FFFFFF"
                        },
                        current_weather_content_layout(result),
                    ],
                    "position": "absolute",
                    "width": "100%",
                    "offsetBottom": "15%",
                },
            ],
            "width": "100%",
            "height": "100%"
        }
    }
    return layout


def current_weather_content_layout(res):
    content_box = {
        "type": "box",
        "layout": "vertical",
        "contents": [{
            "type": "text",
            "text": text,
            "color": text_color,
        } for text in res],
        "position": "relative",
        "spacing": "6px",
        "offsetStart": "20px",
    }
    return content_box


def current_weather_icon_layout(res):
    content_box = {
        "type": "box",
        "layout": "vertical",
        "contents": [
            {
                "type": "image",
                "url": get_weather_icon_url(res[0]),
                "aspectRatio": "1:1",
                "size": "sm"
            },
            {
                "type": "text",
                "color": "#ffffffDE",
                "size": "3xl",
                "align": "center",
                "text": res[2][4:-1] + "°C",
                "style": "italic",
                "offsetTop": "20px"
            }
        ],
        "offsetTop": "0px",
        "spacing": "7px",
        "offsetStart": "0px",
        "width": "35%",
        "paddingAll": "10px"
    }
    return content_box


def get_weather_icon_url(description):
    """
    sunny https://i.imgur.com/UesuCsb.png
    cloud https://i.imgur.com/LoX2DqF.png
    rainy https://i.imgur.com/QY5Btv7.png
    rainy https://i.imgur.com/vgkEB7P.png
    rainy https://i.imgur.com/vetABf4.png
    :param description:
    :return:
    """
    url = "https://i.imgur.com/UesuCsb.png"
    conditions = ['晴', '雨', '雲', '陣雨']
    converted_conditions = ''
    for condition in conditions:
        if condition in description:
            converted_conditions += '1'
        else:
            converted_conditions += '0'
    # sunny
    if converted_conditions == '1000':
        url = "https://i.imgur.com/UesuCsb.png"
    # cloud
    elif converted_conditions == '1010':
        url = "https://i.imgur.com/LoX2DqF.png"
    elif converted_conditions == '0010':
        url = "https://i.imgur.com/LoX2DqF.png"
    # rain
    elif converted_conditions == '0100':
        url = "https://i.imgur.com/QY5Btv7.png"
    elif converted_conditions == '0110':
        url = "https://i.imgur.com/QY5Btv7.png"
    elif converted_conditions == '1100':
        url = "https://i.imgur.com/QY5Btv7.png"
    # hard rain
    elif converted_conditions[-1] == '1':
        url = "https://i.imgur.com/vgkEB7P.png"
    # all
    elif converted_conditions == '1110':
        url = "https://i.imgur.com/vetABf4.png"
    return url
```

## Location Action

While writing the function for getting current weather report, I was struggling on how to access the location of user. It turns out that we could only use [location action](https://developers.line.biz/en/reference/messaging-api/#location-action) with [quick reply message](https://developers.line.biz/en/docs/messaging-api/using-quick-reply/). Here is the description from official document

> **Location action**    
> This action can be configured only with quick reply buttons. When a button associated with this action is tapped, the location screen in LINE is opened.

Therefore the workflow for getting current weather report is like

- User click the button for getting current weather report
- Server ask user to share location with quick reply message
- Server receive location message from user and call function to find the weather information
- Sent a weather card back to user
```python
self.area1_2 = RichMenuArea(bounds=RichMenuBounds(x=self.width // self.grid[1],
                                                  y=0,
                                                  width=self.width // self.grid[1],
                                                  height=self.height // self.grid[0]),
                            action=PostbackAction(label='share_loc_weather',
                                                  data='{"command":"share_loc_for_weather"}'))
```
```python
@handler.add(MessageEvent, message=LocationMessage)
def handle_location_message(event):
    # area = ['台北市', '大安區']
    timestamp = event.timestamp
    datetime_obj = datetime.datetime.fromtimestamp(timestamp / 1000)
    datetime_obj = datetime_obj.astimezone(datetime.timezone(offset=datetime.timedelta(hours=8)))
    lat = event.message.latitude
    lon = event.message.longitude
    area = crawler.decode_coordinate(lat, lon, google_key)
    res = crawler.current_weather_report(area, datetime_obj, weather_key)
    flex_message_current_weather = FlexSendMessage(
        alt_text=''.join(area) + '目前天氣狀況',
        contents=flex_layout.current_weather_layout(res, datetime_obj.strftime('%Y/%m/%d %H:%M'), '-'.join(area))
    )
    line_bot_api.reply_message(
        event.reply_token,
        flex_message_current_weather
    )
```

## Note

- The hierarchical menu seems not a proper design for LINE chat bot, the time cost of switching between pages is too much
- Some attributes are not avalible in flex messages such as `alignItems` and `justifyContent`.
- The location is converted to district and city name by [Google geocoding API](https://developers.google.com/maps/documentation/geocoding/start?utm_source=google&utm_medium=cpc&utm_campaign=FY18-Q2-global-demandgen-paidsearchonnetworkhouseads-cs-maps_contactsal_saf&utm_content=text-ad-none-none-DEV_c-CRE_396517150207-ADGP_Hybrid%20%7C%20AW%20SEM%20%7C%20BKWS%20~%20Places%20%7C%20EXA%20%7C%20Google%20Maps%20Geocoding%20API-KWID_43700049560642454-aud-563211326064%3Akwd-300650646186-userloc_9040379&utm_term=KW_google%20geocoding%20api-ST_google%20geocoding%20api&gclid=Cj0KCQjwxNT8BRD9ARIsAJ8S5xbxq8nR2F-ksLjIm9j-O-laigHvQkZmNZLIsXve2g3sKM7_7symfMwaAu4REALw_wcB)

## References

[LINE Developers](https://developers.line.biz/en/)

[Heroku](https://dashboard.heroku.com/login)

[twtrubiks/line-bot-tutorial](https://github.com/twtrubiks/line-bot-tutorial)

[twtrubiks/Deploying-Flask-To-Heroku](https://github.com/twtrubiks/Deploying-Flask-To-Heroku)

[twtrubiks/Flask-Migrate-Tutorial](https://github.com/twtrubiks/Flask-Migrate-Tutorial)

[Python Flask 結合 Ngrok 架一個本地端的Https伺服器](https://xiaosean.github.io/server/2018-04-18-Flask_Ngrok/)

[line/line-bot-sdk-python](https://github.com/line/line-bot-sdk-python)

###### tags: `Blog`