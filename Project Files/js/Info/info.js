const apiUrl = "https://corona.lmao.ninja/v2/countries/BD"
fetch(apiUrl)
    .then(res => res.json())
    .then(res => {
        let totalCases = res.cases
        let activeCase = res.active
        let todayCases = res.todayCases
        let totalDeath = res.deaths
        let todayDeath = res.todayDeaths
        let recoveredCases = res.recovered
        let totalTest = res.tests
        let testsPerMillion = res.testsPerOneMillion


        var time = new Date(res.updated)


        // //const lastUpdate = time.toLocaleString
        // console.log(time);
        // let t = time.toLocaleString.toString
        // console.log(t);

        // console.log("Total Cases: ", totalCases);
        // console.log("activeCase : ", activeCase);
        // console.log("todayCases: ", todayCases);
        // console.log("totalDeath: ", totalDeath);
        // console.log("todayDeath: ", todayDeath);
        // console.log("recoveredCases: ", recoveredCases);
        // console.log("totalTest: ", totalTest);
        $("#cases").text(totalCases)
        $("#todayCases").text(todayCases)
        $("#activeCases").text(activeCase)
        $("#recoveredCases").text(recoveredCases)
        $("#deathCases").text(totalDeath)
        $("#testCases").text(totalTest)
        $("#todayDeathCases").text(todayDeath)
        $("#testPerMillion").text(testsPerMillion)
        $("#lastUpdate").text(time)


    });

