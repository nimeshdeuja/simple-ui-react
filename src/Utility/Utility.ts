// obj = onject, newObject = Update object and return new object
export const UpdateObject = (obj:object, newObject:object) => ({
    ...obj,
    ...newObject,
  });

// arr = array, newItem = add newItem to array and return new array
export const UpdateArray = (arr:any[], newItem:any) => [
    ...arr,
    newItem,
  ];


// arr = array, sortBy = 'string' key name that you want to short, Take 'string' for ascending 'ASC' and for descending 'DESC'
type Types = 'ASC' | 'DESC'
export const ShortArray = (arr:any[],  type?:Types, sortBy?:string,)=> {

  const orderArrays =(curr:any, prev:any) =>{
    let current = curr;
    let pre = prev;
    
    if (typeof(curr) === "string" && typeof(prev) === "string") {
      current = curr.toUpperCase();
      pre = prev.toUpperCase();
    }
  
    if (current > pre) {
      return 1;
    } else if (current < pre) {
      return -1;
    } else {
      return 0;
    }
  }

  return arr.sort((a, b) => {
    let curr, prev
    if(typeof(a) === 'object' && typeof(b) === 'object' && sortBy){
      if(!type || type && type === 'ASC'){
        curr = a[sortBy];
        prev = b[sortBy];
      } else {
        curr = b[sortBy];
        prev = a[sortBy];
      }
    } else if(typeof(a) === 'number' && typeof(b) === 'number' || typeof(a) === 'string' && typeof(b) === 'string'){
      if(!type || type && type === 'ASC'){
        curr = a;
        prev = b;
      } else {
        curr = b;
        prev = a;
      }
    }

    if(typeof(a) === 'object' && typeof(b) === 'object' && !sortBy) {
      return 0
    }
    return orderArrays(curr, prev)
  });
}

// arr = array, indexBy = 'string' key name that you want to get indexOf, indexOf = 'string' value that you want to get index
export const GetIndexBy = (arr:any[], indexOf:any, indexBy?:string) => {
    let toReturn = -1;
    arr.forEach((item, index) => {
      let toCompaire = indexBy?item[indexBy]:item;
        if (toCompaire === indexOf) {
          toReturn = index;
        }
      });
    return toReturn;
  };

// name = 'string' Full name
  export const ShortNameGenerate = (name:string) => {
    let shortNameToReturn = "";
    if (name) {
      let splitName = name.split(" ").filter((item) => item !== "");
      let splitNameLength = splitName.length;
      if (splitNameLength <= 1) {
        shortNameToReturn = name.substring(0, 2);
      } else {
        let firstName = splitName[0];
        let lastName = splitName[splitNameLength - 1];
        shortNameToReturn = firstName.substring(0, 1) + lastName.substring(0, 1);
      }
    }
    return shortNameToReturn.toUpperCase();
  };

  // Generate UUID 
  export const GetUniqueId = () => {
    let UID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c:any)=>{
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return UID
  }

export const InsertAfter =(newElement:HTMLSpanElement, referenceElement:any)=> {
    referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
}