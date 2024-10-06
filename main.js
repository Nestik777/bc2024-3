// index.js
const { program } = require('commander');
const fs = require('fs-extra');

program
  .version('1.0.0')
  .description('Програма для обробки JSON даних')
  .requiredOption('-i, --input <type>', 'шлях до файлу для читання')
  .option('-o, --output <type>', 'шлях до файлу для запису результату')
  .option('-d, --display', 'вивести результат у консоль')
  .parse(process.argv);

// Отримання параметрів
const options = program.opts();

// Перевірка обов'язкового параметра
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

// Читання файлу
fs.readFile(options.input, 'utf8')
  .then(data => {
    const jsonData = JSON.parse(data);

    // Виведення у консоль, якщо вказано параметр -d
    if (options.display) {
      console.log(jsonData);
    }

    // Запис у файл, якщо вказано параметр -o
    if (options.output) {
      return fs.writeFile(options.output, JSON.stringify(jsonData, null, 2));
    }
  })
  .then(() => {
    // Якщо задано обидва параметри -o та -d
    if (options.output && options.display) {
      console.log(`Результат записано у файл: ${options.output}`);
    }
  })
  .catch(err => {
    if (err.code === 'ENOENT') {
      console.error('Cannot find input file');
    } else {
      console.error('Помилка:', err.message);
    }
    process.exit(1);
  });
