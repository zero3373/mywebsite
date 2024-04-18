function addRecommendation() {
    let amountInputs = document.getElementById("amountInputs");
    let index = amountInputs.childElementCount;

    if (index >= 9) {
        alert("第一级被推荐人的数量不能超过9个。");
        return;
    }
  
    let newInputs = `<p>
        <input type="number" placeholder="第一级被推荐人消费金额" id="amountInput${index}">
        <input type="number" placeholder="第二级被推荐人数量" id="numSecondLevelInput${index}">
    </p>`;
    amountInputs.innerHTML += newInputs;
}

function calculateRebate() {
    let totalRebate = 0;
    let totalAmountSpent = 0;
    let rebateDetails = "";
    let rebatePercent = 10;  // 初始返利百分比

    let mainAmountSpent = parseFloat(document.getElementById('mainAmountInput').value); // 获取主推荐人的消费金额
    let numRecommendations = document.getElementById("amountInputs").childElementCount;

    for (let i = 0; i < numRecommendations; i++) {
        let amount = parseFloat(document.getElementById(`amountInput${i}`).value);
        totalAmountSpent += amount;
        let rebateAmount = amount * (rebatePercent / 100);
        totalRebate += rebateAmount;
        rebateDetails += `<p>第一级被推荐人 ${i + 1} 消费了 ${amount.toFixed(2)} 元，其 ${rebatePercent}% 的返利给主推荐人，返利金额为 ${rebateAmount.toFixed(2)} 元。</p>`;

        let numSecondLevel = parseInt(document.getElementById(`numSecondLevelInput${i}`).value);
        if (numSecondLevel > 9) {
            alert(`第二级被推荐人数量不能超过9个，当前输入为 ${numSecondLevel}。将忽略超出的部分。`);
            numSecondLevel = 9;
        }

        for (let j = 1; j <= numSecondLevel; j++) {
            let amountSecondLevel = parseFloat(prompt(`请输入第一级被推荐人 ${i + 1} 推荐的第二级被推荐人${j} 消费金额:`));
            totalAmountSpent += amountSecondLevel;
            let secondLevelRebatePercent = 2 + (j - 1) * 2; // 第二级返利百分比，每多一个人增加2%
            let secondLevelRebateAmount = amountSecondLevel * (secondLevelRebatePercent / 100);
            totalRebate += secondLevelRebateAmount;
            rebateDetails += `<p>第一级被推荐人 ${i + 1} 的第二级被推荐人${j} 消费了 ${amountSecondLevel.toFixed(2)} 元，其 ${secondLevelRebatePercent}% 的返利给主推荐人，返利金额为 ${secondLevelRebateAmount.toFixed(2)} 元。</p>`;
        }

        rebatePercent += 10; // 每增加一个第一级被推荐人，返利百分比增加10%
    }

    if (mainAmountSpent >= 1799) {
        let additionalRebate = totalAmountSpent * 0.20;
        totalRebate += additionalRebate;
        rebateDetails += `<p>主推荐人消费金额达到 ${mainAmountSpent.toFixed(2)} 元，因此额外获得所有推荐人消费20%的返利 ${additionalRebate.toFixed(2)} 元。</p>`;
    }

    rebateDetails += `<p>总共获得的返利金额为：${totalRebate.toFixed(2)} 元。</p>`;
    document.getElementById("rebateDetails").innerHTML = rebateDetails;
}
