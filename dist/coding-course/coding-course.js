"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task1_js_1 = __importDefault(require("./answers/task1.js"));
const task2_js_1 = __importDefault(require("./answers/task2.js"));
const task3_js_1 = __importDefault(require("./answers/task3.js"));
const task4_js_1 = __importDefault(require("./answers/task4.js"));
const task5_js_1 = __importDefault(require("./answers/task5.js"));
const task6_js_1 = __importDefault(require("./answers/task6.js"));
const task7_js_1 = __importDefault(require("./answers/task7.js"));
function getButtons(argument) {
    return [
        [
            {
                action: 'done',
                argument: argument,
                text: '✅ Решил'
            },
            {
                action: 'failed',
                argument: argument,
                text: '❌ Не решил'
            },
        ]
    ];
}
function getHeader(day) {
    return `👨‍🏫 <b>День ${day}</b>`;
}
async function sendSolution({ argument, send }) {
    if (!argument) {
        return;
    }
    let message = [];
    switch (argument) {
        case 'task1': {
            message = task1_js_1.default.split('\n');
            break;
        }
        case 'task2': {
            message = task2_js_1.default.split('\n');
            break;
        }
        case 'task3': {
            message = task3_js_1.default.split('\n');
            break;
        }
        case 'task4': {
            message = task4_js_1.default.split('\n');
            break;
        }
        case 'task5': {
            message = task5_js_1.default.split('\n');
            break;
        }
        case 'task6': {
            message = task6_js_1.default.split('\n');
            break;
        }
        case 'task7': {
            message = task7_js_1.default.split('\n');
            break;
        }
    }
    if (message.length) {
        await send({
            message: [
                'Решение:',
                message.map((x) => `<code>${x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</code>`).join('\n'),
            ].join('\n'),
        });
    }
}
exports.default = {
    id: 'codingCourse',
    name: 'Задачки каждый день',
    active: true,
    description: ({ history }) => {
        return [
            '👨‍🏫 <b>Задачки каждый день</b>',
            '',
            'Держите свой мозг в тонусе: сформируйте привычку решать по одной крайне популярной задачке каждый день.',
            'Представьте: через неделю вы будете уметь решать на 7 типовых задачек больше, чем сейчас.',
            '',
            'В течение недели вы будете получать новую задачку в одно и то же время.',
            '<i>Помните об последовательности решения:</i>',
            '<i>1. Решите задачку влоб</i>',
            '<i>2. Перепишите на более оптимальное решение</i>',
            '',
            'Отвечать на сообщения не нужно: как минимум, это неудобно.',
        ].join('\n');
    },
    state: {
        tasks: {}
    },
    initial: 'start',
    blocks: {
        start: {
            execute: async ({ state, setState, transition }) => {
                const allTasks = ['task1', 'task2', 'task3', 'task4', 'task5', 'task6', 'task7'];
                const restTasks = allTasks.filter(task => state.tasks[task] == null);
                if (restTasks.length <= 0) {
                    await transition('end');
                }
                else {
                    let nextTask = restTasks[Math.floor(Math.random() * restTasks.length)];
                    if (!Object.keys(state.tasks).length) {
                        nextTask = 'task1';
                    }
                    await setState({
                        tasks: Object.assign({}, state.tasks, {
                            [nextTask]: false,
                        })
                    });
                    await transition(nextTask);
                }
            }
        },
        end: {
            final: true,
            wait: true,
            execute: async ({ state, send }) => {
                await send({
                    message: [
                        '👨‍🏫 <b>Вот и прошла неделя</b>',
                        '',
                        `Вы выполнили ${Object.values(state.tasks).filter(x => x).length} из 7 задач`,
                        '',
                        `Повторяйте чаще, чтобы оставаться в тонусе.`,
                        '<i><a href="https://t.me/winterview_contact_bot">Оставьте отзыв о курсе: что понравилось, а что нужно улучшить.</a></i>',
                    ].join('\n')
                });
            }
        },
        task1: {
            execute: async ({ state, send, transition }) => {
                await send({
                    message: [
                        getHeader(Object.keys(state.tasks).length),
                        'Напишите аналог _.get в lodash/underscore.',
                        '',
                        `Примеры:`,
                        `<code>get({ a: { b: 1 } }, 'a.b') // 1</code>`,
                        `<code>get({ a: { b: 1 } }, 'a.c') // undefined</code>`,
                        `<code>get({ }, 'a.c') // undefined</code>`,
                        '',
                        `https://jsbin.com/maregabigi/edit?js,console,output`,
                    ].join('\n'),
                    buttons: getButtons('task1'),
                });
                await transition('start');
            },
        },
        task2: {
            wait: true,
            execute: async ({ state, send, transition }) => {
                await send({
                    message: [
                        getHeader(Object.keys(state.tasks).length),
                        'Напишите функцию-валидатор скобок.',
                        '',
                        `Примеры:`,
                        `<code>check('{[()]}') // true</code>`,
                        `<code>check('{[(])}') // false</code>`,
                        '',
                        `https://jsbin.com/zemucivogu/edit?js,console,output`,
                    ].join('\n'),
                    buttons: getButtons('task2'),
                });
                await transition('start');
            },
        },
        task3: {
            wait: true,
            execute: async ({ state, send, transition }) => {
                await send({
                    message: [
                        getHeader(Object.keys(state.tasks).length),
                        `Разверните многомерный массив.`,
                        '',
                        'Примеры:',
                        `<code>flat([1, 2, [3, 4]]); // [1, 2, 3, 4]</code>`,
                        `<code>flat([1, 2, [3, [4]]]); // [1, 2, 3, 4]</code>`,
                        `<i>Вложенность не ограничена.</i>`,
                        '',
                        `https://jsbin.com/dedixiluzu/edit?js,console,output`,
                    ].join('\n'),
                    buttons: getButtons('task3'),
                });
                await transition('start');
            },
        },
        task4: {
            wait: true,
            execute: async ({ state, send, transition }) => {
                await send({
                    message: [
                        getHeader(Object.keys(state.tasks).length),
                        `Напишите функцию, которая проверяет, что в отсортированном массиве встречается такая пара чисел, которая даёт нужную сумму.`,
                        '',
                        'Примеры:',
                        `<code>check([1, 2, 3, 6], 9) // true: 6+3=9</code>`,
                        `<code>check([1, 1, 3, 4], 2) // true: 1+1=2</code>`,
                        `<code>check([-1, 1, 4, 8], 3) // true: -1+4=3</code>`,
                        `<code>check([1, 4, 8, 9], 6) // false</code>`,
                        '',
                        'https://jsbin.com/getubeqoke/edit?js,console,output',
                    ].join('\n'),
                    buttons: getButtons('task4'),
                });
                await transition('start');
            },
        },
        task5: {
            wait: true,
            execute: async ({ state, send, transition }) => {
                await send({
                    message: [
                        getHeader(Object.keys(state.tasks).length),
                        `Напишите функцию, которая проверяет переданную строку на палиндром.`,
                        '',
                        'Примеры:',
                        `<code>isPalindrome('Коту тащат утоК'); // true</code>`,
                        `<code>isPalindrome('Мало кукле дел – к уколам'); // true</code>`,
                        `<code>isPalindrome('Другая строка'); // false</code>`,
                        '',
                        'https://jsbin.com/bexaciveke/edit?js,console,output',
                    ].join('\n'),
                    buttons: getButtons('task5'),
                });
                await transition('start');
            },
        },
        task6: {
            wait: true,
            execute: async ({ state, send, transition }) => {
                await send({
                    message: [
                        getHeader(Object.keys(state.tasks).length),
                        `Напишите функцию, которая сжимает символы в строке.`,
                        '',
                        'Примеры:',
                        `<code>compress('aaabbc') // 'a3b2c1'</code>`,
                        `<code>compress('aabbcca') // 'a2b2c2a1'</code>`,
                        '',
                        'https://jsbin.com/tomukofoxe/edit?js,console,output',
                    ].join('\n'),
                    buttons: getButtons('task6'),
                });
                await transition('start');
            },
        },
        task7: {
            wait: true,
            execute: async ({ state, send, transition }) => {
                await send({
                    message: [
                        getHeader(Object.keys(state.tasks).length),
                        `Напишите функцию, которая вернёт n-ное самое большое число.`,
                        '',
                        'Примеры:',
                        `<code>largestN([2, 4, 1, 5, 3], 1) // 5</code>`,
                        `<code>largestN([2, 4, 1, 5, 3], 2) // 4</code>`,
                        `<code>largestN([1, 8, 3, 2], 4) // 1</code>`,
                        '',
                        'https://jsbin.com/kavonezazi/edit?js,console,output',
                    ].join('\n'),
                    buttons: getButtons('task7'),
                });
                await transition('start');
            },
        },
    },
    actions: {
        done: async ({ argument, state, setState, edit, transition, notify, send }) => {
            if (!argument) {
                return;
            }
            const taskNumber = parseInt(argument.replace(/^.*?([0-9]+)/i, '$1'));
            argument = `task${taskNumber}`;
            notify(`Отлично!`);
            await setState({
                tasks: Object.assign(Object.assign({}, state.tasks), { [argument]: true })
            });
            await edit({
                buttons: []
            });
            await sendSolution({ argument, send });
        },
        failed: async ({ argument, state, setState, edit, transition, notify, send }) => {
            if (!argument) {
                return;
            }
            const taskNumber = parseInt(argument.replace(/^.*?([0-9]+)/i, '$1'));
            argument = `task${taskNumber}`;
            notify(`Очень жаль!`);
            await edit({
                buttons: []
            });
            await sendSolution({ argument, send });
        }
    }
};
