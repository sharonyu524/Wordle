export default function Keyboard() {
    return <div className="flec flex-col"> 
        {KeyboardKeys.map ((keyBoardRow, rowIndex)  => {
            return (
                <div key = {rowIndex} className="flex justify-center my-2 space-x-1">
                {keyBoardRow.map((key,index) => {
                    let styles = 'rounded font-bold uppercase py-2 flex-1'
                    if (key !== ''){
                        styles += ' bg-gray-400'
                    }
                    return <button key = {index} className={styles}>{key}</button>
                })}
            </div>);
       
    })}
    </div>
// Remove the unnecessary closing parenthesis
// );
}
const KeyboardKeys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['','a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',''],
    ['Enter','z', 'x', 'c', 'v', 'b', 'n', 'm','Backspace'],
]
    

