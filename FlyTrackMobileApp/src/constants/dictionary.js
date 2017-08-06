/**
 * Created by mityabeldii on 05.07.2017.
 */

import * as mvConsts from './mvConsts'

let vocabulary = {
    flights: {
        english: "Flights",
        russian: "Полеты",
    },
    followers: {
        english: "Followers",
        russian: "Подписчики",
    },
    following: {
        english: "Following",
        russian: "Подписки",
    },
    follow: {
        english: "Follow",
        russian: "Подписатсья",
    },
    language: {
        english: "Language",
        russian: "Язык",
    },
    maptype: {
        english: "Map type",
        russian: "Тип карты",
    },
    settings: {
        english: "Settings",
        russian: "Настройки",
    },
    donthaveanaccount: {
        english: "Don't have an account yet?",
        russian: "Еще нет аккаунта?",
    },
    signin: {
        english: "Sign In",
        russian: "Войти",
    },
    password: {
        english: "Password",
        russian: "Пароль",
    },
    registration: {
        english: "Registration",
        russian: "Регистрация",
    },
    confirm: {
        english: "Confirm",
        russian: "Повторите пароль",
    },
    next: {
        english: "Next",
        russian: "Далее",
    },
    alreadyhave: {
        english: "Already have an account?",
        russian: "Уже есть аккаунт?",
    },
    airport: {
        english: "Airport",
        russian: "Аэропорт",
    },
    personalinfo: {
        english: "Personal information",
        russian: "Персональная информация",
    },
    firstname: {
        english: "First name",
        russian: "Имя",
    },
    secondname: {
        english: "Second name",
        russian: "Фамилия",
    },
    aircrafttype: {
        english: "Aircraft type",
        russian: "Тип летательного средства",
    },
    aircraftinformation: {
        english: "Aircraft information",
        russian: "Информация о летательном средстве",
    },
    name: {
        english: "Name",
        russian: "Название",
    },
    callname: {
        english: "Callname",
        russian: "Позывной",
    },
    number: {
        english: "Number",
        russian: "Номер",
    },
    signup: {
        english: "Sign Up",
        russian: "Регистрация",
    },
    notmandatory: {
        english: "This is not mandatory page, you can skip it by pushing Sign Up button",
        russian: "Это не обязательная информация, Вы можете пропустить ее, нажав кнопку Регистрация",
    },
    developing: {
        english: "Developing",
        russian: "В разработке",
    },
    visiblebuttons: {
        english: "Visible buttons on session screen",
        russian: "Кнопки на экране сессии",
    },
    networkconnection: {
        english: "Network connection",
        russian: "Соединение с сетью",
    },
    heightruler: {
        english: "Height ruler",
        russian: "Радар",
    },
    scaleplus: {
        english: "Scale plus",
        russian: "Увеличить",
    },
    scaleminus: {
        english: "Scale minus",
        russian: "Уменьшить",
    },
    mylocation: {
        english: "My location",
        russian: "Мое местроположение",
    },
    showmyairport: {
        english: "Show my airport",
        russian: "Показать мой аэропорт",
    },
    shownearestairport: {
        english: "Show nearest airport",
        russian: "Показать ближайший аэропорт",
    },
    warningradius: {
        english: "Warning radius",
        russian: "Радиус опасности",
    },
    km: {
        english: "km",
        russian: "км",
    },
    visibleradius: {
        english: "Visible radius",
        russian: "Радиус видимости",
    },
    start: {
        english: "START",
        russian: "СТАРТ",
    },
    stop: {
        english: "STOP",
        russian: "СТОП",
    },
    editprofile: {
        english: "Edit Profile",
        russian: "Редактировать",
    },
    send: {
        english: "Send",
        russian: "Отпр",
    },
    addcomment: {
        english: "Add comment",
        russian: "Комментрировать",
    },
    distance: {
        english: "Distance",
        russian: "Расстояние",
    },
    duration: {
        english: "Duration",
        russian: "Длительность",
    },
    close: {
        english: "Close",
        russian: "Закрыть",
    },
    sendtosession: {
        english: "Send to current Session",
        russian: "Отправить в текущую сессию",
    },
    hybrid: {
        english: "Hybrid",
        russian: "Гибрид",
    },
    search: {
        english: "Search",
        russian: "Поиск",
    },
    addvariant: {
        english: "Add variant",
        russian: "Добавить вариант",
    },
    enternameoftheflight: {
        english: "Enter name of the flight",
        russian: "Введите название полета",
    },
    save: {
        english: "Save",
        russian: "Сохранить",
    },
    doyouwanttounfollow: {
        english: "Do you want to unfollow?",
        russian: "Вы действительно хотите отписаться?",
    },
    unfollow: {
        english: "Unfollow",
        russian: "Отписаться",
    },
    cancel: {
        english: "Cancel",
        russian: "Закрыть",
    },
    signout: {
        english: "Sign Out",
        russian: "Выход",
    },

    aircraft: {
        english: "Aircraft",
        russian: "Летательное судно",
    },

    youareage: (age) => {
        return {
            english: `You are ${age} years old`,
            russian: `Вам ${age} лет`,
        }
    }
}

let russian = {}
let english = {}

for (let i in vocabulary) {
    if (typeof vocabulary[i] === "function") {
        russian[i.toString()] = (value) => {return vocabulary[i](value).russian}
        english[i.toString()] = (value) => {return vocabulary[i](value).english}
    } else {
        russian[i.toString()] = vocabulary[i].russian
        english[i.toString()] = vocabulary[i].english
    }
}

export const dictionary = (language) => {
    switch (language) {
        case mvConsts.languages.english :
            return english
        case mvConsts.languages.russian :
            return russian
    }
}