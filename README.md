<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>返利计算器</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f8;
            color: #333;
            margin: 0;
            padding: 10px; /* 页面周围的填充 */
            display: flex;
            justify-content: center;
            align-items: flex-start; /* 从中心改为顶部对齐 */
            min-height: 100vh;
            width: 100%; /* 确保 body 占满整个宽度 */
        }
        .container {
            background: #fff;
            padding: 20px 40px; /* 增加内部间距以提供更好的间距 */
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            width: 50%; /* 将容器宽度设置为视图宽度的50% */
            max-width: 600px; /* 最大宽度设置为600px */
            min-width: 320px; /* 最小宽度设置为320px，确保在小屏幕上的可用性 */
        }
        h2 {
            color: #333;
            text-align: center;
        }
        input[type="number"], #amountInputs p {
            width: 100%; /* 使输入字段占据其父容器的全部宽度 */
            box-sizing: border-box; /* 包括在元素的总宽度和高度中的填充和边框 */
        }
        input[type="number"] {
            padding: 8px;
            margin: 5px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            display: block;
        }

        button {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        button:hover {
            background-color: #45a049;
        }
        #rebateDetails {
            background-color: #e2e2e2;
            padding: 10px;
            border-radius: 4px;
            margin-top: 15px;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>返利计算器</h2>
        <input type="number" placeholder="主推荐人当月消费金额" id="mainAmountInput">
        <button onclick="addRecommendation()">添加推荐人</button>
        <div id="amountInputs">
            <p>
                <input type="number" placeholder="第一级被推荐人消费金额" id="amountInput0">
                <input type="number" placeholder="第二级被推荐人数量" id="numSecondLevelInput0">
            </p>
        </div>
        <button onclick="calculateRebate()">计算返利</button>
        <div id="rebateDetails"></div>
    </div>

    <script>
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
    </script>
</body>
</html>
