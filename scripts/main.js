function buildTable() {
  fetch("https://api.github.com/repositories/19438/commits").then((res) => {
    res.json().then((data) => {
      if (data.length > 0) {
        let tableBody = "";

        data.forEach((commit) => {
          tableBody += `
            <tr>
            <td>${commit.commit.author.name}</td>
            <td>${commit.commit.author.date}</td>
            <td>${commit.commit.message}</td>
            <td>${commit.commit.url}</td>
            </tr>
            `;
        });

        document.getElementById("data").innerHTML = tableBody;
      }
    });
  });
}

buildTable();

// sort function works for both columns due to iso date formatting - if date was formatted differently then separate functions would be needed

function sortTable(n) {
  let table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;

  table = document.getElementById("commits");

  switching = true;

  dir = "asc";

  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("TR");

    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;

      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;

      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
