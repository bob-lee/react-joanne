import fetch from 'isomorphic-fetch'

const API = 'https://us-central1-joanne-lee.cloudfunctions.net/getUrls';

export default function getUrls(path) {
  /* on free Spark plan, cloud function doesn't seem to allow external call,
     so for now, returns from a static json object.
     Really?
  */
  return fetch(`${API}/${path}`)
    .then(response => {
      console.log(response)
      if (response.ok) {
        return response.json()
      } else {
        console.error('getUrls failed: ' + response.statusText)
      }
    })
    .catch(error => {
      throw new Error('getUrls error: ' + error)
    })
  /*
  const response = work[path]
  console.log(`returning ${response.length} urls`)
  return Promise.resolve(response);
  */
}

// temporary static json object that holds current set of urls on database
/*
const work = {
  "portrait": [
    {
      fileName: "Sarah_800t.jpg",
      text: "30 x 30 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Sarah.jpg.png?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=e4cYR2Mnr7hmmTGCAA8x%2FFR%2B2C5JZAiUDsIfmuDX8uK3FAAOSdTo8dz6Aq%2B%2FNQoz94zCnIo4VVPN2M976KQJB0yyjaKMPv7%2Bayax%2B81rBl5duP4wD3iLqczMJlyT1KQeo3Usp66UVsRqbasXj4o63ZeeOVFA5WFMPcOxsoVT0mAn6KmFkqzUudmy%2Bi5fNjRY2x0rTeAKlMu74R5weoC07oE9Fq%2Bz%2BErZhTWTfrEgH85LYuvHXxxjTQufS0KTQqhMiyHGBt5kh4EpnsDeaHdbUoE9TG8fpwzXUCQwcyWX9f6zmG0q7KazlvH1NODqvd1L2nS8raUw4E2n7u7x%2FD0MwQ%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FSarah_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=XrpORF4BaWu8Y%2FVc7HIwT5BnxkWR8lgI9Hz%2Bbb5kDmJmOhI22LfzQe4PaxEp370enbmWJvNAITYCgiignQFD8%2FPT9GWjCocBB3ISuf5tomy4X6j%2BLTWNuGcWv11oKZvF%2F6%2BcXOantL27z%2F40Uez6xDVmgknLsg0GjCGhErEZuoZXgxY3JtYrpieTMvQese%2FJ8%2FvVyMvWbUwI3pGsIyCMhjKSRb3%2BRjeMoBy6Q%2Bm4FSS%2BlU2c6yhnB0rfXwy6u2n5ohpoSKRN%2BLn09X3udDQhNfksmEkHrpHRHDm1Kj3sqWrJjTEmwJjea%2FHHHDQL4GslzO050x2j0xf8n5szgxtY5Q%3D%3D"
    },
    {
      fileName: "Isaac_800t.jpg",
      text: "23 x 31 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Isaac.jpg.png?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=kT86Y2bs1WYkBB0lvBKv2jQRDR9fdkA4OkC9VI2FJhooVF%2BUqNklsbPpoynK0Ru9skKwBoEsDr47Q7IEV7H7ClEqq4KB9CpZfXJWFVvxPCsJPHwW72MRMGA%2Baol40HXV3HI3yywkJ5Q6epDMr%2Bpha7Afmf9wi4hf%2BNbdThEZPcqf5iDDURkOezJlh2zPstoWhn91djQj8vjVlbb%2FyjID2shevHqFK0e%2BiQwV9Z1hSGcdNaZKJsHvwMuQUiMiKkhceqiy5lstpY2FASB9BSbntvrAzOJUUEkL0M7IHLj40RrssEfPtxhBcME%2F9ulQ7c9zH74pz50UJn136tn6Rob9AA%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FIsaac_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=F5KbvCYSDUc04VqRhlfXyZbzHzhF9Oi0h4dfwjnfB9YUdvTB29WSQ7eii7m58lqlqJmZCfEp%2Fz7KuZQ25Qo5rYSAWByH8DMQfpzrOq3QJiBopCjQ4zcsG9gYCQ38eGUi9dQVOFVfgyjcgYvZYLmyG0Or%2FL1GWafpJoAFb6PxgL%2BmM%2Fg2KZChwjwEb%2BjSVc4KLuaircoijFyEl9LccdSEAnkSEiUJWoSlXCtlbMIS9eNWgY4gjEKUF23YEAK5WaIED0mOOTsaPuLgelxVvST1oMreQjkfbRQzct%2Bm2lDNgp6kBmjhh0umlOorKUKvU3YADBn9PQncXmr1hnUtRgwZqg%3D%3D"
    },
    {
      fileName: "Marie_800t.jpg",
      text: "20 x 20 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Marie_800t.jpg.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=Vk5yQE%2B46FLIcIYp4y3vp0uUFKyD00%2B8lDxiH%2B3NIKIVoyCG7PRr7d3ZkHUzDFubBlwzhByDuFKFC04HOPZ6wS87sK%2BEwuU8vr%2B4r22HPpvu6VQ9ZoOyPLN4L1eiwHBOxSY6mMMjpx2FCWUR6%2B40vjA3NPNnegaxqAvSPBxdfe9%2BdxslCp8pjft9%2Byf%2F5Ecc246vmv1a6q3gQl9F8Bn%2BqZaNwsxNvgM%2BzkdMbQb43KvFwZQuqN%2BBBnCirnbb137N%2F2MzOb3yppA7hY1jrVSSKjZD217kAE4q0HlvnjcTW2%2FTaEhdwBl27mO7fyVeU6DE%2BHoBckUcEdFRfdgk2Pcjcw%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FMarie_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=GifQLa9rlFTIH3FsUuIrwgIcXrZymlWCNRvVYO6NInDgPSVsdBo0daASO%2Fdym5GUNcI2%2FmByj7b6JKOQaBsuiSnXOjhPw5X9j3SXVXyRZuLW68tj7X1xW97VsR0O0a9jBzIjxy4fXDLcYB9boEHrcyRUTMLoZpkS1e88sHPiy2M00zFil8PJoO4QOa%2BT4eC5Gh7onITFKOtCkjFel6u94sjPSeE8FPswom8ISoEeXnnYvViQfnGEQC0J6upz7KrA0aNoSKxkJt%2Bw21BA6UkLO0YrsZ%2B4sOPN6Uy9b7LM%2Bbz4SAayNALpbzlMEgNFd576lK0mSNqjUIsLmb9kJH1tWQ%3D%3D"
    },
    {
      fileName: "Fiona_800t.jpg",
      text: "20 x 20 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Fiona_800t.jpg.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=THrB62n3ehe9VcYL1xnx%2F59xis0X9bxE5a8%2BwrH4%2BAqGYjQUTd1DCmxBo9I4Al%2Broy1rrpEabnsHudl4bkkuv44cUjdbKExdLbg5FjsAF9zwfEx4IL1CIpW0o2pAsZNZyz08y4P5qcVRn1%2Fw6e9LiMakUtyrVYVW7a2faOopmRPCSOXJ5Zez9h3WUM1crBUcsUArIrEMAnD9zxR%2Fd8EE%2FLab1oaCiFjXnKZ4O8vtyMU8teokiHbH%2BEt4MJPRkX8nF9u3m4RNjODkgxBoNzng56EQNggDwRumxQW1Xzc3DouAk0LIEql%2FnEkkicOI%2BXiNiH5sWUPCVT%2F5frd%2BPhtmxw%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FFiona_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=ErjHqy8s4cyQCp%2BtUuGCEY5KOn7KGSjk1VOMFhXelIqo6WGy3I6ZMa0EZwvikO7xjPa61NlcbL5VaYL0A9LTXFNY0NmuW3acP5ieQVjfMD0v%2BacwV0FOpSWY2ITw8%2BMyZ4umlw3grCD6CKGAXUCdcSepGNwiC05uUHJtlWJtZMAXJAZ2Cew4RCi5uCKhn%2FOQ7K3saQWaAVKSEcjM29klA3CO82T6Y%2BdpSuo67BC%2BQVpABavr53qp4MdjCFe8WdEktdzCGORDewYYWTEMxYYOMih7gghquUJexDs7gmbo3xctIUEzIrrOd9WckyOc3VgaDZVpS%2FBZ7b6vl1RmoOS%2BNg%3D%3D"
    },
    {
      fileName: "Jjong_800t.jpg",
      text: "25 x 35 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Jjong.jpg.PNG?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=VUE5MJBvYgq6nSYP21LuoLFGVnnhkyuHtLBqGR3%2B%2BULla1wl3IyMTpHcj8vNSJMzJu6hIYhhZtAal%2FHFfmJVGF7vyPaAP0VR60Cfq6HO2hjdAlQ6ZmqYO%2FyVTFJSkzhfGXrg7H4YEx%2BH7ePS6Lt1TGO78PmiDWn%2BbFUROnMiFnREsLkb4amC%2BrLxQeKQL3TpwW0z5XW0gzC45omGN%2Bb028RKU7e0Hfhn9Oq6GnQU8dU%2FiNaaaeu%2BBNyaiZRHIookXvZTix%2Bo50BPLtfQdEfA13OlQ71nvaeN%2FdbBlidVugrDUKIRzI3J0mT%2FHZEo3wy09KeMHnm3G4Dbvit97Y1TpQ%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FJjong_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=WXHJCDzHNnzVK%2B3HGwZSuteoKmB6j%2Fdy8xE7Q61ccSOTmWf%2BDRTkh5mRhH%2FiTHxWH0sjjtIjtY2oR2vXMZhj66J8dr1vuGq%2BaltffMkgnfR1c1TAfdcVnhjYjaEI%2FLcFOHTwRvJ8lto%2Boc0Jqs3nwokvycKzJ6m%2BbZZ3RvGqX7oijD5bD5G48EvwaUw9iUif9TssFAn1axegJucBUbSdlAcBTL%2Bua%2Bp5aOHa0cVm1vAFBojrDaXGmFrL3GXD0DGzzqYUx89KJAnPQtNMG3%2F6QPiUam%2F75vHTxTUqZ61ntSnERdADW%2FX%2Bh6RDjSDxBsD%2BFB%2F%2BYc17skHMe1m%2B%2F1Y%2BXw%3D%3D"
    },
    {
      fileName: "Tony_800t.jpg",
      text: "20 x 20 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Tony_800t.jpg.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=WN4MAuB4kViDyAc%2F7u6FVc0DCwltxKzU9m5wy9%2B0zEqQu6gu2zTHAr3ENE9GaNsVyeGqeKmsvMmolGdmyPBZZBuUbfBgKeNZsNrGuJmZS%2BdcDYpTQC6FwMAPGv9y1IKsYLTiNWsJ8viMKqD7qlrurG9xyY5wU75b%2BGQ1UZ8CRKuTr0IAX2CNW%2FV3951lOkeyn0HoRoXml9TSFEYHtc%2B4ffmCCel0gbUpAByIi7McCTB2rcLTPSOVe4kOTrMPkxyBWAgR28qZF88E21tmael8ibkejNaPoYg3%2B5MEe9LzRVtKwpqp1P96tp7I8yUTo529Tyabysl0W%2FKJmwPAJlK%2Biw%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FTony_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=K%2BqdmRe3wB%2FvTUwtCvcb4yx5Zfi79T%2BZL7vkpe3Jody6Vg2DWOnPP6TOTazJ2Ep6sPFTD%2F%2FYdAmq5JuMKYmyyNDP7t50Or3isDAM%2FebdA%2FA%2BKMY8cabfNiMAXwkX4uKfWUmw2rh15ZFN5vtcCIVLTfFI29n5qIkc%2BCt4yQPtKGUZUa5G%2BmxLB%2B%2FK4Vs9KiR5pdVCQua2nPA4wFYdoa8IalByaJcwwp3C9o%2B%2FWUbCZPmpAWI%2FDPRLJ81HBQBmZz1kPuis3f1KEuWDy3nTev7CHCzjeg%2FGkFYEUD7OF%2FZfwNmu7%2B0Znw6RbufNrplSuZAae%2B0I6wRgYJ6JbE%2FvDLi8fA%3D%3D"
    },
    {
      fileName: "Leah_800t.jpg",
      text: "20 x 20 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Leah_800t.jpg.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=jNwOpOlP65VKD1Hxqst0eJasF6%2BfySdtN%2FKaOGHaoRW8C7eL64feQn4ZNK4L6PgEBylDAkd8VlCOz45qCvus78xDfgEiEm%2FjRW39s2eNcitL8eYa7HMdN1JHLL7u8aFyYPBq%2Flg5TsLT3%2Fh1WTd%2FQnZLmLO%2FmNmvnNQ%2FmT%2BPaVlhRIGtfqDBaEHOtb%2BAGcmLHpKVgMs%2BfDcTfdqtoG6cxppgjuwh8KVLReiCuVBaNzldoI7bO5c38OiSJXPnCQcAZYN7K3U39mfZQVmyzF1zraQKYjNyFUD6qCUFp2ajIgcezDrJL%2Fmn%2F0Xw4xa6yJkXtN2yJx%2BNW749ttfk4fUSpA%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FLeah_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=pgtqMALoCutv0ou1rbAiy7NBfwHHhLIGBMM3BqpdmLWrJwaN9URHgU26F%2FO7ThC5R7bYM0MUt4tkJ5PB4QV4d5M1OTATw1hzA03lo3fac79j%2FcsC8lhaYU0BC%2B6PxLKIdWl0%2FfUMIxdOiSSf9Cz3rFqTkbKWa0tflB%2Fcw0bsLzHbb%2FJV2WysEINdmuCzilNdzRIn46TMjJ4y%2FzocDTDfHF%2FVLsXnnGvUgfl26IsAEl%2FzBl8db0c4IjWXCVffrS188RKp12qqZSIcrDtRwmXbJbqQ%2B4VCLDtF2nyFfJuW9HtagTsWJ76o%2BV%2FSes1FojAyM5AXkIL78VDsgeDZV0LRKA%3D%3D"
    },
    {
      fileName: "Manon_800t.jpg",
      text: "20 x 20 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Manon_800t.jpg.PNG?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=aCuUgFQ0NBfG%2FUBHlUZHyEkr7B%2BiIdedE9Y3Y0%2FlxnwEdCZUG5YLdqoK7Bxkq%2FGcRvu1fDpAswGkwMeMmCAxM%2B8aua0oYVHCfKWE%2FT1%2FyvuN8pSkLappDKsMqXwCJFtehpa%2FOFsU6m89LmscLC4rKCN7h5Z%2BmJo5a%2BKcZFnVBBgtGLpnYaTAjrbYv1%2FiSGvJs1hEpEVOCOgUKQNNURIG%2F%2Bj1fXDtWY%2BrrjmN%2FoU2JOGSLCGZdfPypQ3i2CLeVQ10fJDDYrAzwysO%2BRH4BO%2F4E9Lb30i8bJckjIjaAk67rIlWMvp60%2FpeWwBqE4wZe6uIhNJMIuCBU4qEiSyJnAyraw%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FManon_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=p%2BglWdDtwJfX9bh3TDtOb%2FilSuCkcUjheBR8N8fEKXbopAbMftBEGxKEF%2Fe2L%2B98kBu6j7DgKQj5%2BHxsGh774mDc82afV73hMq1UJi2VCzwpVNpuQZVC5OowXCC5UA8HeyI2uT%2BIM6oGo1ZBgNVICHtKvq0xSZe7WPAQ%2Bak%2FJqm%2FpF2Ljcmli0r2iGf2zf58FQ9Mi5r3tyBdeDrimJ0Ayykr%2FP2rMB1dRJmiSR9o6ORwTCSg5vH0UqR4IQn3BMJXHFiT%2BSvaNaPSYWFSNsLSaUT3%2BNVSCPOaUfWbEdRaRMsrFRqSutKm808ey9ZzZIXSSkAQ%2Fg5Od8jh2OZoCejgMg%3D%3D"
    },
    {
      fileName: "Bob.jpg",
      text: "20 x 20 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Bob.jpg.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=YfP9C9sdGXDo9EOG3tOi43UlQh%2B48Q6HJO4iFoRFqLW2nEdZTbmH1gNZNy25PZtA69jnyNfaaX85fE3PZsEF9ZjHNPlWuaEDWnri6misYlqf9Jx4FDAf%2FYVJIrDPGCSrtI6zSRBsU0zY4LmK1J8zsOeOgZBqQ8ku65h0ZhVzXt2PcFpZ0F0BZiZB9QShzCOXdy7P9rITyouV6BH8oiVpTpaqJXXSbS5WYOJ6zs0QrKWorPZmIIA4BoNn%2Fr4ZDiBcUPbzjM8DZpVdASfEyl%2FC16aeurbR4kpxkl7t%2FoRzGuLeajOM3BCOjbabzd5Y0%2FaejZHFcjd0n8xT6Rm40CtBvw%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FBob.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=HNxZpvLVcwkImTEd0wArEJ9NfRkuxh6YOOW96XTp25Blvzi5DradutAv7LaI60I6azBsLGozF9OwoXunb0VbAoEDEj7%2BJ2rQltD5xYBfpbE4mHMVACgyK90IsgRoxrsFPd%2F1m231H7r1%2FvfKFIE5xUgnEqoncZTv8p4927EF9tVGPn8NmKsrZ2n5XaZH9%2FYG1vtnZU3MgpN4lYlkJuzFGzJDvSaUjmWhPiDfONGKWY7Qsgnj0PF%2B9eimlymLERHW%2B6yX3OXZ7BChupRi035fge2tc59nFpQMkVffjF2DCB7qHfmXvCQq7Ty4ZXX%2FJ8eMZ03alwJ1XsjVdcCfToI0Hw%3D%3D"
    },
    {
      fileName: "she1.jpg",
      text: "15 x 20.5 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_she1.jpg.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=oaW8zDCKbLDZ9f%2B%2BDr6il9mD6W6ItXcY8Kz0k0c1lTx5amvhH0tI0xDDIH9ttifVFYPahv5KVR88bf%2FKfw392J4cMhiV0ee8f4hHnTmsnxofAJyllDZgB3xva%2F%2BPev5rKt0XOlC8RlETqinDGTf8ymo2Jh9IOVsYCHBCnXPVtcyH3BeGXQC5b%2FAP%2FqO4%2FDcyUJVObU0gj6cjLc33stNckKMcdp7C2LZJLZQMfqKllxjyrmqkMigkD68d4tHB%2FbB1NCuDLHHC3gpAJDBUr0tOKxR7duiYu6WDf4H6AlMIYK%2FdVmX1NAhhTngSXPPjonmYkdFnAXeMXVDfKJffCtcurQ%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fshe1.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=rhZnGgxRPr9CFd2eyUHSEPSQJMLcWNJK49%2BNYbkKbziVzm1VcjaDvbkaDEcdttoe6j30gvZLAFLIyAqM7%2FGilD35CGrHrznkfz8nRHW%2ByIzxKWKunOciATe%2F%2BX8lMecAvAx9z404%2F7nshA8eANSPhVWDLcBs3hb%2Fcx9XGVe0pXFVSDQPQxj4Aw5j%2B5x9mYex4S7sqWPc%2B7kSAheW8AFlLbh1obXTUk38Wftxljz96q%2F3vh%2BH1DQc%2B5RxgSjZfV0c4Go0wo4HLFCE%2F55n9zoq9NTDUPYQK%2BimBOjNMtjtJcXOb4CPpqZ8iWhIT7w%2FhmXcgMzi8tvlwZA14DSf8fOiRQ%3D%3D"
    },
    {
      fileName: "she3.jpg",
      text: "15 x 20.5 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_she3.jpg.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=JRMd525fqy2JMnk0gXuhiZ7AV3ZeeyUB9eSVPhijvHjUr1IMmKH3D9pDC62fxX0nT0%2B52sGdFKwAko8%2FdK8mn906JD9tHmMUWxTx%2F2Z8QiyxjLKHbkkXYft4qlBsRP0Ic0oHrxBthTipndWxgvASbU3D6JYr9lgzRcmMcZYK7Z2fIZFVbFh%2BUeNks%2BwtyUXGL44FCQRkma5W9%2FwLYMoeRcuAzNslczvZEVmJSvFDrxSBDqowCm%2B6lfX8AJ0PS8kaN1TUq%2BPLRjEeqLRXlflnl%2F4B7aJpb5HoV0cAuFsKslLxRtoYUJ8rX1X9yt0LKrhPIrluzNn9Mw8p6suQiXExww%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fshe3.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=nsJLWxtUEDjeA4kuZY%2FhGnHXAJieijFxGFm0hcqrNMy5q%2Fs%2Ftueei7VCPdXTqBUeM9TOHPXxV9PUMVpiPaBlBGVc1puK6vtHjreaA8X5XZSJWCV0qTML%2BahFuIQpD%2FzZePJRFFNbhemTMg7S3RCaln%2Fd3u%2FBhECsiVTlk6WStd13s2FGsbIta5Z4wnQuOOnb8eTGNSgwoP3v28qPThc7cuQ0kO4FItFSzQy9HsXxPxe%2BT%2B3AmFwi9UedRFu%2FEfbnuGr1p9X5ldHAUqjo4mJbGUnE7cg%2BW4IPXA4LrlOJo1wLIsI4QXFUgz%2BsRGhwhu5R%2BgF6IZl8B49Rh9TzlDusLw%3D%3D"
    },
    {
      fileName: "hj.jpg",
      text: "20 x 25.5 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_hj.jpg.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=Gz2PITFCXdwYXSSt0ydVVyste4YeSmHVYg0OKPxhmjgjGDRqdZyLi%2BlM0MONRrVAcHff5dlVyvOWTnfQCNhojTf1ToGy4OcxFr5NdnPQsFLzLpHpKo2RRxdbeNNmDl0c2mLXX4qMmzi85WVlR0GOiVPsAsXIMp2LgcsfNfC41NkAFwlywZdyufWV%2BXJV%2FLyvfiRXKvXk9m6GlD4DaP7nzePYbIq5xbgxZCgdVwV43tmicoYYHjWOMiGdpPrRh2l04QaAXipnrpfbAXazUqF27h9rUsphYliad88Gv4riOsyiUe4OlsZcNOXzVoUJlSvVav%2Fie8Ouh2vehaWdnJROtg%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fhj.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=JKBUyAAN0KH09BbCRLwei6jUiCRnc4Fmkfo7U2hN0VVuVsZ5SwrqFu4eWnni6ftJmhBo8Ysc0PEXz%2Fayx2QV8ONbOqmXErdZrHs3fesiU04wu3LQpcDEEkV9qLH%2BYSyQwURoKM9%2F1%2FNzB8gV00ljnQ2RnZGqiOwYrF%2BHN4PM%2FUX7BwD%2Fp7e4C0uQ4mimpZCMKUNOAi7POSkZjHk8vRbDMlYtcSd30sA1XP7O5P32C921LfynBTU5jd22e4PYD4HTjsO4lqI5R8HwpGKI6AUCp0iioGqvqvn5lipbBjAP%2BWQcpuluQSm9ut%2FO0kZ%2BZpD7du8m6ij%2FzT14xUt9cvWbyA%3D%3D"
    },
    {
      fileName: "jeewon.jpg",
      text: "20 x 25.5 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_jeewon.jpg.PNG?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=U3peT7d9yxkmoY4ruFRKfx5GOJnoJWtHZGNMzL3Cy3ZVke901O7t4%2FIVIdZlPtcrMBdJVCTI1knRPy%2FmMPMv34uazg1KuI7pTsK8ISIl0ns4eJczQdGyKRh%2BwN20bd79ApSOIItq%2FVaTCkA6qwEC28Niy1Dhj2rEtvfYfVLojdmGxUgdY7pBAdPRdVJrajq40v0nJjCh1ZQ6ULbyg7RDOQHWKgEJsDzDOGAWYlgve%2Bx6YVIXalyjhjbFhHHIq1qajEQKeN3D4kwdGv94X4DShYGd%2FbhfJ%2BSuGNS3INUcp8cnF0jRvqJobfA1Yk%2BqhXnfnHZ7B0ibfTRdzi1GGzPhig%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fjeewon.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=BIscMT%2B8ihuXBEhezV8zeyUsqYUktLvx2W9KINZ0BUPmI1939ghsXwkI%2BLXA%2FYT2l2qCSN%2FxSNFThCKioIMDLqdg049Dovt8gqeObMxZ1o4f9tzbsbK2xTTwnBHleHNjNt1OdenVs9c5Y6NwSzyxO4E8F6fqeFOtoX%2F%2FPfowajKCTV9uqKNWSQb%2FX1Zb%2BFf73PpRARwI8p8oWrYvcXh4T480Jq6WqpubdhDkCy49wu6PTlmN8Qy8%2BYx2F2XQvMOeS2I4IHuxYGRsJiTvKt9IrdfoH31H3RLvbJgFq%2FZR329dVwnA3cyEC7BLF52udC2D%2FJdWxsp6qbGZ1sfjEXJ6EA%3D%3D"
    },
    {
      fileName: "Margarett.jpg",
      text: "20 x 20 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Margarett.jpg.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=mMRRySFtpcZzsxrBryHbjkbLsTgyq3ssppISNALspQRuEP4ARqBKLJhTw1NlQ68jBWDZ5b%2FiD9Z3Fttz93YIkJYcyJrckOw6%2FS%2BWpsYWFKZYwSBAyK0pIIzHlA%2B%2FbeI2oysJPpyNzF94brSmf6sLBUT896%2B8M3%2BLA3u2n2joWNnCxmSqtE1x%2F%2Fx6Uz%2B6x7K17jmzolwwp095pYdmxTENJaGPK8dsLOAl37xMLCktdUDbtt8y2P8jLeE3B0Ezk0uE6DkY8WkHhEeK%2F41L3K%2B9JdROn1ll%2BVqlVT6dvS6%2FI19yPnM4NptOy2cvrjE1S4utVcZS9VjRe7K6UU%2FwqXzX6g%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FMargarett.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=PjQSIG7%2FqEKEFllUB5p3og91wb19bMSWS%2BGVN6T%2BCUdC5cfGFgTa7HsvLc0KzZtadqx%2BrZ7P6GPOTe2umyNZladBypkrXa1%2BC1gY9snyk0nqM7vXYFHhrYOWtIIwHXnpWlPUCt6eIvl6khFMRTY8HjnErSS3NOV%2BM2i4JU%2BnHnvFbz4PTv5I6adoElb65s2PvEu6w0KAsn%2BAmRrQpQIgsYZU1BNzE8RYX5Fvj6qdkNh9eKrCdTQrbUcZKp2h0SRqBb1Ei28UA7tszvMR7ZmKm1PgSObn0nZyOJwJupALDzl%2Fa5wP1tgXbDVKZ5w4nwzdPo4adClO1PEs1GVpiS4p1g%3D%3D"
    },
    {
      fileName: "Paul.jpg",
      text: "20 x 25 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Paul.jpg.JPG?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=KkBRJFXzJTHeXKU%2FY2R%2BBJk6f9rAeqY3l8ZTqZa1CIJDb5fxElgwITtflx%2BlUiSCq3k51wVx8J4MvIXBJA5%2FKTyD2GLQGMF4SEXK883HdiGhUhKoByvLzdOhvZJLyzh%2Be3brTZWmLJtnBnRgZnp86%2BRrC5w%2F9guqzTY24D05HzTJYmmV8DhBybns9GJJe3znxl%2BGmFLAf7O4cgIm6pdOAENWaIna71pi0ENGm%2BNCTV%2BXB7EdXLqJ8staGp1xz2UPziHN%2BgxHPEMhoL%2FhRs8%2F%2BbzOWUxbr3%2FE8ywmn%2Fr754oIechKpeGkqrvXJbidQy9Q5jHpFB%2FpFfCu0ZWuAy6IXw%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FPaul.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=ManZNlt%2BSyCqPyNqHRI2GAgMhIby4NV%2B8BiAUOmRQbIrWrgGAg9Dh4vcUBpT%2FicGus91IrNyHPMLzDRRp5Aac0lG3PKBNyC688gIgcLCo91f5CuglE2P%2FjXwWGVKQd3vI6wn%2BeZbKUsqMoHZJEw9D36hFDoJElx6aCARkkwtaEHmKQFvBpeZj5jLSgeYbRWR8%2Fx2rA1iN8KDtd9lt8i2a%2FOWV0%2F%2BK07E0wlzRifbUWvH0gcOBsv7NlAm2jWacGtUn8VFFecF3B6Bbem8GfJ9IznBTltBW1e2Q%2BJ9lnSLnEACcjfO0USuTz8bgvWzhwxbyV2g%2BKqrP5lBrvQF59jKSw%3D%3D"
    },
    {
      fileName: "Kelly.jpg",
      text: "15 x 20 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Kelly.jpg.PNG?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=NFz6yW8zDMV0Y3x2TR0QxFpg6CzXl3J9bsBFKkYFRjEwdWvDIDadh8uam8129%2Bbkx7okn%2FdWxacozFr2zAAejFHoWrD1js%2BV7u4VrcEwr08x9RYBlKUPon5juMrcbd8e2yMmbUmiukLizNl5eNlZSKDhzEDli%2FthgDEyavI%2B5l8UOD%2FS2IQ977wBbmdK0g0HskI6%2BqZfYCJJWb2C8jTTVoSx%2FD01CwJCPyhm6JhaFezxad58QDBFZcPiXs4bc%2F5XW3Kp9%2BWQDjj7KF%2BGXZzCjou3Vutw%2FU3DoyLSxEq%2BtRHuUWcFo6SYWNVNlfrMw%2Fc3GUR0I6YSP7%2BRFgAi9rvi6w%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FKelly.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=lRJRc7OmiqNnfeAUmq%2BG3BYovdY4DoftoSsZycw9tMa2TiYJ2x92VCHe2AqGaOnYO2kNvUbOoWEpi%2FxsTVuL%2Fk3yQm14rsAOhWBGGQpSDpyj5yzwGIAVpgVvXePlWqbBA3WTgXNfB%2BGp%2BftZgWerIFNv95q6BTtAiLhyLgwLEfw4WKvnOqLNcLN0EUwMXbXIVClWk0P9Jx0jMIO0C9MWXfF1DyeLS0SC6rnajSON6IxnJpmUcNcxBnumczCovbgMIGPh%2FlDbPkUcg4%2Bv3OfTzo9Tvn6C9VKoi5vr9MS5x50RFCXsfvUthUpLp2V1IgnEx7hALX%2B6Xop7dJ%2FGrAfjng%3D%3D"
    },
    {
      fileName: "Mathew.jpg",
      text: "15 x 20 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Mathew.jpg.PNG?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=nr19hJ9XYbyfLQjT18y%2BlYCOdLl3EvNPBtvcQarpGLrZVIqSuu9t%2BXMBeKS3UQQNikRl9bkpsn6a7ZaDx92wj%2ByJZ%2Fr8y78M5nwaEPNaVgRtWLxazfjnRQy2vB9JUILSYng31qcuHGNl2B3is9MQGWqgzfVX3IRIDiqcb63Qar9g%2BwvLAkqywm%2FKUSLyoAe%2B%2FBavzuGY4NWxiRPhb%2BEiH5kCWnCMVsYxL1mzAgiWvbzpU9VOWzjCSIIefessp8fe10zSMoPmfU2glSiHJp5loTDUJp2wTd60wHXnpuIFW3zL5QPLB6Yltu6USEXbTQoEDRJOhdcH2W0%2Fuq4q2hWa1Q%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FMathew.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=puybouCdWpL3HGNb8N5Fq5CPgk6zmw7J3xiqc3dJ8xaK2xzgmcn7T4HYKDuhZE1Gl7j9f6eQpa0Ty901Y7aP5X7Ta1QHvaONfUi%2FUdoA%2B9yVabrYVqhjFAXUoHrGMKDQ%2BCwR2HaX1NzA%2FV5AoTzY7%2BAHQWYsp3DU3rhLxfphJfW4gSnMDY%2FgEa3ojNN67SmiN3QB%2FoUfSLdeXOIM%2FZhgrqDGxF%2BLpBfMvMctvLvQwmeQIw3ZPsbTpfejNPa2yAlJiwM7ReiEUIZHKA7kiNqzNVUSBrXyFtb25Ttv9E6q9kk3QVvHhnabpGHSnjuLwIKtqwrfHifTwlPqQeoTanxPOA%3D%3D"
    },
    {
      fileName: "Jessica.jpg",
      text: "20 x 20 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Jessica.jpg.PNG?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=Wo9e8%2BpOSBOeS%2FtniEL7s5juy719fLyynIjRcMJDHv6YVjfneMrVCbUCHvdSW74n3G6FSC34%2B3J1ZOJortNcgxJYwCGHmvYrJLYdEDMYbP6QOFgyH01Cq9rnDwsYQPubA6WIb05jS4GCvhxUrDRX6MN7t%2B6V46AFTmJdF3Dd2%2B6CZDflVbhaYhr6MJxMieYrFuV%2FtHrKOfYGbacJ3TkcXXORp9NIn%2FQMiln6doLtqdBZKutKOQlsSeepHW3ueh6xKbWJk9OxqlXHBfozqlgakqrZnUVz8ajxfhelWDs8udQxljcrmNBgMhSmC4GrTJKLfhipQUew7ZLg20%2B1gGJTzw%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FJessica.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=P6aD2HT8LyFfHBgzk9cBgrOGgPHUfZLQknOcXu6cx%2BdIKHYqymT3UBIptTlg2PY6ZwxJBDXQ%2FpcYUmSqloN6kOiK2buFqm9%2BBzaGyv41o0BXIBbCReL4%2F7G9Kx8TDQO%2FDhgQ%2BrzwSjEMv4%2FRfmDil4g4q8lqE%2FTLjPmLV6kt3PRxjAZEXhdyQlCyRRFOdd4dFGmEVkbIVyOQWsXuK%2FHeEVtqDtH8WW8gIOMD6WuCMATrifbQb9f7k8%2FxOviVWtdLtgNyhkaime66T582BHd6VJuipJ4TALMPZRsx5QeDgn%2Fa1yA5hX9x71R0SA%2FImH8wo6SIO%2BXvSpav%2Fef%2FPuMIXg%3D%3D"
    },
    {
      fileName: "Dawn.jpg",
      text: "15 x 20 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Dawn.jpg.png?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=AhZOYPv6ShR%2BD%2FpXOPYReIQ0cn6VLlCrEFlScH5V4TYD5VNuzXOGbjjNGFsDkaxLJVdfasMYBBCjH9GPPW2fnMzSh4Y3aW3TUyJp%2BfLIVLcVxB7GgS6t%2BQ5BT0IcQZGsxLOK%2FhwMLJgIAM7nVNsbIKZZ7xER3Gb9VDT8hhLOZOdkzMPhK3gZlUMZC3WRujpiF0q37h4sPojNgicRxbnJCwfeDbeyqsAqgrhg4R9vELXcAqvYTnQnrhV%2F2m%2Bf5TckpBBRYTXhGeQtRY98UaqQM%2BgGrcNC5GynmNH0Z8OXbJlY4X%2FFKVNKTZulSe78RnICbY%2BMEaPk5urSgqmQy2W3%2BA%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FDawn.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=IEfC%2FHyHvhKVAOpTKhQY0TKCaYJ6XiPTXbbpz1BIFIgIJ%2BWqsDCvGQcT3fB5zYF%2FR%2F9qmrrKYQa1Xn%2FzSR3P9rCj2nVZ%2FNzoAMyHgtHagPEsqRi8blHGIlmdsy9yGyeUCfyD6wfO88qZSNtOXu%2BK%2FWpotcJVI0Ft9D0rmek%2FtH%2ByIr%2F6Ovsnhnrr%2FyF4w2hiku8YE0xl7ohuIIZ2YkPFRUR7XizqAkLrMcQh16OsnbBmS82r50jjtlNIIioKD0fJTRs1V1JuSuq0EsvT9KKwLNflH97BDddLPR%2By2Q%2FgGQP%2FVhoIVKI7yhLuct0JU8cXnZz8HL3r9PFmc5Lg6q5X1Q%3D%3D"
    },
    {
      fileName: "Brenda.jpg",
      text: "20 x 20 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Brenda.jpg.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=ZFCGYLIy1BTzu7sS%2FxlgJXBQQjSSG3vOF5oucz7TqXbJtg5115RWg3m8WI%2FKd0GANiWG9gbLrOOms1s6QdTkJimyKpvIpcETE705vow6dVwyuQeDeeugbfla729tf4e4fkEIfaRweCvTp32Tx4PNvhtNVpE9YoDJO7CFUt77KWgNi29iTO9MPmnoD4wyfpnR%2BjMXFMekL2%2FJumzi%2FG%2BapfPgzdq8tAD92CH3Lzht2RB8%2FxZ5WvdR608JFEfdnezZkVrBYY1vs8CJp45t4vmpMpkoTmq2LyHi29VuCB299RecnP7sMP9SQDp58PVvCX%2BEigeEbNwGqxDpHUAETxPQuw%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FBrenda.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=bXubgLbDuj4RKsvSNrp8PcN%2BfNFpgHiGa2OErpRlGoBiF9oe3mmG4hbIkRAC2n2NfIiW1VowjBe7p%2FgoyFZTOenvsObLxSQlebopqwmow0hrIaX5n%2BKGRQYgKKHxFPoNXqRyuC6VtxbaPT5Y8cxFykA%2FOzOvP7sr%2BB1zY3qeuBuReoFwb1rJIJVyWzUQO4orHfpdEdmckjgEJLQj9xmBktTlbUbzXcmHN9Feqacv9HVEcG0ULwCL%2BBVIz45TbhPDca95gu9yUFXHNpP9WTI6AVUncHVQHwC9%2FGHA0XFshGRFiWyaGjLSK0zTASFvzfbUpr2VK1rlIO4J0jhZE%2BLRhg%3D%3D"
    },
    {
      fileName: "Sue.jpg",
      text: "20 x 20 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Sue.jpg.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=Uw1OajnY2Q9fpmhFDk%2Bodw9hwg3dGHQqzDiEznBx4Q058%2BdGz49jMxMnXK7XYpy8%2FuGzK%2FzweiBTn3q1n9sIO393w%2FHrm0a0Q49WqBNRfysWHS3HUnReIx2DpyDj%2Fub3RHOCKtJFJSIbmafoc78eKYzA2jMPNLJG23lGK7TanSUK8up1Z9XxV33rjGMWDgpgaMfDswBOWTd1lt1DV5RqzRR%2FKLWo5CgdSlWQIbY5y3s58i1uYc3HdUugRKbzO0eKSxvB3QNC494QeJ7ckUl8qO%2BvgX8LJj3NdaZ%2B6iXoEzYdkNF7WIy7zrie1IjqJa3%2BzJPiCMe2u8zOHo7NMvVXcA%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FSue.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=kBkQyw1gS0C7J57wocNTsYbKi9QOYvbet%2BsT6ASdWgPiirpRrOym2tR2I6C%2FmV7ErES11E6VdQJiBt7gsFt4RUpALatlfAdC3MIAxAYPBEeKeiDH73DqIcdrxY4fGskT0NJnqzAza8pAIyrGRAxTGSme4An8wVYauLb%2BD3JeuYWUoMZ4xPjiwlR5%2FNdYItA33q5ly%2Fg2vTjycx04IIs7g42wz%2FXiUi07aF%2FyOO3CghfheKqPhKaFp3JZlTWaNieI3D9jjdxpIoPfS%2BVWfyThWfgFjqW%2FO9LCRNgH6qaLRUW93cD%2BIFRVtebRmplIjsahPqrvVOGsZ3r%2FOxZFMTaS9Q%3D%3D"
    },
    {
      fileName: "Jocelyn.jpg",
      text: "20 x 20 cm, acrylic on canvas",
      thumbUrl: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2Fthumb_of_Jocelyn.jpg.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=Qv%2FFaxy64nVnqGXeJ5MqnEJWiLdy2w6Q69whYj%2BvfxYUKfKeKRJgSsy8PQVTHovy25bjiGgrOpCSOLDv5D2JKIa91vdHn3n4qfuJn0Gw3V6WCuikXIo6%2F3vpW419bU7MZdlGcH0%2F1HGesKn%2BacWIqOvmFU5yssxw0ZQZtZ28oRy0SoE1C%2FJGXyGKGsSCBiyaly1TnFGI7UWpt74AMR%2Fn%2FE%2BpygwWG%2F1mRcTWnH2ecxHH0uc%2FlFxiktnGvHtvhzX71btHIbwaadyGzpCT3ciBqsS3mkZk1KcEXHeJk1Vo4pEFTWpaeJmqbkDRNiZAtIBHVGHuZBQk0ppPuTN6Rbyajg%3D%3D",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/portrait%2FJocelyn.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=W9rF9zVeodf0JX91T9XCmBwTj6eYlb%2B%2Fi9MZRbTXbLUu1KHQF0GSJO0soNrRoTEf78n9J83zdygrK%2B3JbBxp8NFZKcOAXvG5N0AAV%2BHLlrSP6lm%2FbetUogVLQnYx%2F%2BKV4y38EGtQQIo2TaNzjfXEAz8Z16WWmz6EBuiD1WVZDwmoh10KjvJTenJuGMKhUxn5SLeMd7plqMR7n4HzYYwCtpK1LsoQurZgyM9k%2B6sCmZSJEUbxVQE1rAQU%2BCMqkvnZ%2FPnt64aN9hxQjBxVBKY8Xp5aDGKu%2B%2BI%2BrLuuwck0FEPfRZkVRn5MA7IRIv1Q5f6X0f4dGipoUWUJFdEQYsdyPg%3D%3D"
    }
  ],
  "painting": [
    {
      fileName: "1Flower99_800t.jpg",
      text: "45 x 61 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2F1Flower99_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=i%2B%2BR05ptgrQ2CqqnU1bwn9AQDrJNM5NmNU1Y2GhMJhHcRnS%2Biij0AMv0zytqxyO5vn9W4Po33uLBcTjOFVFGqvV7447E9dtPhqkjEP5xhFCrp2KnTmsRJUxF0cW6YAOv2tSOXE8FTSVyIGdhXWn53ecc0%2FDUX%2FHvKa72WqeqvKugdF0MKuWkk1vf3HuD9Cr1XjA6HccxdcV%2FPjWRWf3jauXDtsZGKBEZlVaEghtTScgMoZb%2FBdyf5%2FbuctU2b40VhanO5TeuV0wDRsuwgXhi3j9UbXXInH8wExqr8Y1HrN51H1AEnKAAL0228qhMpSXbXzHXeOicsqQnO78iYLtfFQ%3D%3D"
    },
    {
      fileName: "2Flower2.jpg",
      text: "20 x 20 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2F2Flower2.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=HeP445%2FHQiE%2FLL2PtxdichVY4ldKJ%2FlIrx3uxHKzeCZkorO4aCKzE3Eg%2FngNtxyXX45KBmB1QoK9b2JLCWzJ5TiBZhn2Hb30s1%2F8EObD4PJ3klTPkPBd8p5Wl8DMMg1A9QulcPEE4L3OA30aIETZ8H2%2FDt%2BOzaEtb1En3E%2FmqWM1rsa3yIXmdzVi6orccbHlRaGXAjOLGYU78quK%2BclrXoTXmc%2BubtW2rbLz%2FXlRdqdcZd8is%2F4SDu26Ednc43pC6bLeLTBya5CIWmhYvv20b8fF9cvoCiga8F4b%2F07duGwgtmJAvWf8n%2BKenm%2FgQQyKgPun9BMpv1N6CcL07zY7DQ%3D%3D"
    },
    {
      fileName: "3Flower3.jpg",
      text: "20 x 20 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2F3Flower3.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=M53OrFWeaidc1yB7M8VRp%2BARZKqbyUQ4KO7%2FlC0dDqy6X8yjAHfWHv%2Fg2kPYbz2ma%2Bj6SYws8H7eTTo3ukHXvCrFkm6ReJ1Yg2zf8sQRxGDakq6gBVDmxp8WNAER1D6Z8Gk2vJG7XsdE%2BjRFrMh%2FXRDXomDFZcJtnWWSBzfYA3gaIviY0d9tGJOytLRTu%2BeiPy33nsWye1SE0fd6vkfCYk1vlottZFFKkgoDXDY926F98%2Fq2o7WDKUJ7lPaMNCVN5GgzeBFfgADgpIqr1tFG0329mPYP8Uhns6jkzAEZuXly%2BtlY5MEriw2ZOsZ%2BGluDp6pN7Vb68coLAsbY12P7aA%3D%3D"
    },
    {
      fileName: "4Flower4.jpg",
      text: "20 x 20 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2F4Flower4.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=mah%2BQJNW74TjW0eECKU7g8BCT2Hx8f9pryAwy68kRMtzAJIt%2FwoZWgwk918Un0sBk7azUdmJNbTt57uiDi4SVBCqh1C%2FqcsLInMo2NflKunwf8B53qefQxKuEZ7hb%2BWT0HgrjEW5IXV4txB%2B3DUpbhwfnjmCz8FOY6DA%2FHb5jhhoJZ82nA0WBR76MZnljq%2Fm6tRci%2BJvTKOJaYMlMKRgPeWvOGttJ9s6HhErXJtRDU%2F1r7o5dOINcvxQVI2eVOpy0lVtQz1jwqsZB7CC%2BkRAQaye9zwe4U3ZC7d0Q4e%2B8N0fddgmD%2Brnlxl7LDaVut3vPPJ9Bw3ockcO7CKJ5ysbRQ%3D%3D"
    },
    {
      fileName: "5Flower5.jpg",
      text: "20 x 20 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2F5Flower5.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=QtJBg5621%2BCs30orL%2BDDkw4dYFL%2FI8%2FLrVMlobs9jDSND5XCbcycjzpTwvSjEm%2FOe%2FAsNy8voNtGQ9QbFTu5a5Mho4%2B3PCV1DsFBGlUgir2gpZ5GZf8bFxbPZ1Dy3koNsDKjH2rBPtG2Be8YQ2xA9bX9UKlD%2FqhdDtr1A%2BIfB8ZcI0okqOwlaoqUMdE6xBbqyDW0tJdTX%2F0s3%2BnX698VE7ou%2BbFkdk6NDwsvbF7ozBMHTy%2B3Flq3V6TXLiX1cioR%2BIkh5ayIuMciSBFT5O2d0k53nK4c65C3eYeoyAVP9N4L8KIypzaMoN3Ex67hIWzVF%2BZvDTLmU0xba0NXyYhvSQ%3D%3D"
    },
    {
      fileName: "6Flower6.jpg",
      text: "20 x 20 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2F6Flower6.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=LufcHHcfa77Q9cZFvOuEMqFsP1AV2XraJ3WyqVhX4bo%2FrnNMukQRY9rt%2F60JDrpEESTkE%2BQV%2FBg6mer7v%2Bev11lTzv1tffYnY2ZOPUCdReHc%2Fs7kgzxzmtxGjkUx9ue29grK2bYkH6ybjmkePYMEbqmkvNJblEo6t1d4DDp%2BAajp1mlIQYgCJXhLOz6eTC%2FQPMTDicAkGx4cBZfqB9bWoPyEipH2OWlPN47yJkSlcNVUfXPMWtjFIDEKclSU0I8n31EjeJURU37dCxDcW%2BWDPbfKERjHnY98ijLJwhzM2hHSwZlhwKf1jU12Y1Js7N7VmuKIoRh%2F6r4rsAdfIOnHjg%3D%3D"
    },
    {
      fileName: "7Flower7.jpg",
      text: "25 x 25 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2F7Flower7.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=CpmqHy9r1a%2FngLXWCmA80D%2FEIPhYwr4OoTkxxUh%2FBCcy7MsyEdHc%2FaBUp1wtkZvnSUShX3lDsYYqwamf%2FS3S%2BSiQu9iZ5xmHB6BuH6YvsH6pmZqEuj6hreP1dGbDyJA8dqXROBcILqg9l1J%2BuVYLoM1Dv7X7wZasc7pKMX9tkdl1H5dytMfKc8PQVb34vHw7wemlhBroqYLdovAHjMKPoX0qpyAtSFKNln%2FqYgsUfNqBaulwCKutzcwJvtUJ%2FR3AfYzB1LlGmgH38ipQLChn48OBxINj0JcIC9IhBLB5iGt1hrKhJJz9jnePzSPPFgoIHHtJA3CO68lK0qCFM%2F3Ucw%3D%3D"
    },
    {
      fileName: "8Pot1.jpg",
      text: "30 x 40 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2F8Pot1.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=FAAkOKscf06uUtq20OzeJLtCscxCO%2B9ToQ1VJ0GDEElNscplpPi97J%2BIC%2BvxhtIM4WgtJfTFGxR%2BQJiCK1om3MthcnDBqvWk92K2v0H3r691HJym%2F9NVSh2WWA3sJhRIRxTVM50EkiXcjOoIhy4ipE9mMLNGrfKGKe8UYb4WyYQlkiCYTCQiDABG%2BZcACfKyc%2BMywOtQiKbrJEGZpDKhlgVVKgkutUEnbg%2F4wsit3gMO5h7A4%2BtgchwoDrtBme9f4yd7agYlZcpf593Q970ccImXk%2FRLXTF4q9iolxM%2FfpOdbNAl%2Bu8JupkVTW7LkjId4vuthoLvPJgcr7ejMxVMCw%3D%3D"
    },
    {
      fileName: "9Pot2.jpg",
      text: "30 x 40 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2F9Pot2.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=EKLW%2FOi5m7cfSkh3%2B2K9LCSPw7UxjKlEzTdOGDaUIm0h8ns4PvVCpMmUuS8VQWcvA6ihqT9TFLHVTqumF75yK7FnuCjdg98J5d5BS7kVyD7Q0K6zY6hawvw4cYfb8N4yBuESWH1QikjAmg9yhqleJVNmUeCxg8J3XRilfgg6xeM4eNd1TUH3SCbI6o95eiP3P%2FF%2FIx061Pu24LisvCMT0yrH6WeciprJoHFX7Ak4SDTwOeQkDgG9FgiBeb8r1pobrKZHDyyTr9BIg3VJN4Bh%2BbP34Iu33nmF3kTve4cODP2zPYTrs%2BVF5vSAzq4xL5Qx9pSRFDNfXKLfHY1VlpEolg%3D%3D"
    },
    {
      fileName: "aPot3.jpg",
      text: "30 x 40 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2FaPot3.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=b59j15t3g36ToCb6ic%2Fi6aQSGJT2KsIxOua6Sx3Ih856WFevP0p3ozSaaEklpyuP3pOEhgJ0jr5km6nhyEBIcxKzb8%2By3JL53zl6zMhvxYRCI%2FPt12XiqBeE8Ii7Cy0dUUhrh4jujUxnf%2BN%2B61zCvRyZJSxm0Z4%2B%2BIWOk3xMGqRaAmYiLhhMCzfF4Cx%2FHPMzUXJ4tgjdKP7MVvjO7iG7yhudQ6SFpawukmfrJz5EwtTK9OAPY0y7o88LQ6ZnojXe1JW9eEyIxNaeNEJB3IsM6cIEQGHuvQ%2FJuGB49x8cfTpX%2FgCNMN%2BHSroTrL7Z6wKj%2BC2knnyqSc%2FPRg1%2BMRmwUA%3D%3D"
    },
    {
      fileName: "bLansdowne.jpg",
      text: "45 x 45 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2FbLansdowne.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=CiEIo51pyxsc%2BDoR842eHSZCD1lvC31fVXSlIu1MB%2FBzIRKEMPKzx4UJqsBNNVN%2BHE06f3Zbog1y%2B5jgcJkNXBqor5W%2BwmVyY3hY6tmdj5ro0%2FMkzW2lk041Kng5TRyPpXVKAUirG6Ve9U1NGpFMMzMJACTQH72keyi8Bx03ImYt%2FB4uChMKyJVD%2FlB7lkIWH8O3%2BCQDGo7QLPhGTT%2BOxkhvRCrZnmDfY2ozGpc%2BMIJMHcr0V7JTEtA8ZWAQt%2BGjPMxaaq%2Be1fd6q0V%2BD9Z2cT%2BSY6NasKhCAHMI24c0rTYLtiJcDt9zy5dOGpksTKqH7spN3kdem5cmc%2Fiu6fjCKw%3D%3D"
    },
    {
      fileName: "cWairarapa.jpg",
      text: "45 x 45 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2FcWairarapa.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=IAKf6eeRFLqv%2Fl5qMce1RBoRDvMcPZsbAXDAwBFVDNw8nZ53DQKL2IdjjZWSZ9%2Bnsa7MupY3uuNKmbH00OhrZkaUR2hvUPcJo5Ge0%2BIXLe2bKi8ACXsMp4qphuKu8XpQjvFFjLJKjIxMN2Y%2BW%2F72N4Q02qb%2Bi%2BKBaQMl8fJrcO68sLpe5kl49NZllnTAqVw%2FHu62q8DshZad4nimxAwVHpujov8r3FmqkNkoNHDnPoOtHaPuMKYA5ucbNzNn2nzXc%2BRshfHAVrnTXl6BPA4Kcg7ZTv15ws7dMqW2sGk58Wle9bpjeybrrrUtoX%2BCZ2c8skO6fv6zOtFq%2BeRn8vxrvA%3D%3D"
    },
    {
      fileName: "Flowers3of3.JPG",
      text: "20 x 25.5 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2FFlowers3of3.JPG?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=VuGrFe%2FNy465I3GFQ753%2FDsfZCkuO7LzPjSBMlhiM6ZQ34PVeUxfNhSIyvyHWjHrQuxTBQ%2F793nL3%2BfDZx0Pb%2F48P3IlipdKXkfwjSFXcUILKYQ23OAuQW2%2BtVdwaCppoonuOhr7sk0d5inskjnIbfn4Pewt3aD2%2FBxLhV70PBBu%2BSxzXmgadeUWwzWpDUGS4a5G0Hdtf8DrcXgKQ8ghZoLYNiK3LKAe0OoQKOG6gwOJ4ob%2F2Tss93FaOsI%2BdpgS9YGwya6pNqOJvKLwMifjYUmhmhSA90yWThEWU4HuvD9cpJ8Z%2FXQ831QNCaDImK70zQ205Cer%2BTQrQkbLMpv6vA%3D%3D"
    },
    {
      fileName: "Flowers2of3.JPG",
      text: "20 x 25.5 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2FFlowers2of3.JPG?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=f56DMLXkBFkutJTxoRJFZKLI%2Fi3IzF%2BDjIvVRq5mWvsKetQ7nOO4yU3ELE8aJUgnjFNU%2FpePGQEg%2Bw%2B%2BqK8B1Vn2yc5hTmXBpWjwqXe%2FwDE1j4Ddc2eu1Vn%2FfQh0DxUGNedYZqoK%2FHYmALWGq%2B%2Bxv8DJa8gv0zm7KQEt4S2nvs8V51LPeQ4rDP6wjrZWzjcVC%2F5vg2d%2B1aO%2FMpw0CLhdhi2hewCFLOTrk3MeyXmJ4wdhZeJH1k9YHx%2FYPSmfKPbvAChS4uBMg0K1Dtg82w3HFCPBOc0F%2BJ%2FuclqTcBOAoWQggo4VZ1b0Q2%2BD5yRi%2BAelK%2FvXoLEgwpMCSpIs7OWosQ%3D%3D"
    },
    {
      fileName: "Flowers1of3.JPG",
      text: "20 x 25.5 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2FFlowers1of3.JPG?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=X0pdebCsVieW40LfrSIcU6LxbY2IOnGrsbMqa84aD9R12r24Wbub4EJomfu5AJ1xuRj0m6fNkGlanOUfu6PLOtLUKcb74DMX8VpkDO5kQcLFULXgFPNLUD3aH4zavKpiRMnUufCAHGvse68INNpDHemO%2FyOag9j5jZDH3eyrTi%2BqbWDZEduBR7TpsRvUlvjJwGidg%2FnQQ%2F%2BbHGcfVVBRLKi%2BNI1LG7Zm3FUBGYlyh2e%2B%2FWHgA6RdZ9A0cHIiPvDbI2sWiFSjaKXBlN4inP34DjFexDwzelFH1%2FrUlnl5U3EzXpdGpbkafY0IS9Y%2B5fIwl0KGr1euS4Nx%2BNrt3V3zGA%3D%3D"
    },
    {
      fileName: "IMG_3159.JPG",
      text: "20 x 20 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2FIMG_3159.JPG?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=Ld%2FDLbICx0ng%2FuURK3JPlUNhI7mh%2BzvEcf%2F9Ro85QPwtGNLOaZuHBRS%2BpXIZ7Q7ywy0MbW7fMjFZL3ilBTuf4w%2BOvK%2BZDH8spKenwcqjNpxIMbi6ZVGMzk7gGFtOhDjvcPNCVp6U1KbD7p09h3x4FH%2Btk3RlCmELYuBUsDuVC627VsfOZFAuNgIOOwaN6Kaec0zlhdTqwbmM0T3ENdoGtT%2Bymj69YpgA%2B4saZ4mv84LJKiar%2BGrcRHOkgQ4xu%2BCM4ldLFm8i83QQmyFBvuOfujh6qMw7cj%2FV6r9RZ0AUoiWIRR2xs9yf5C%2BwTA9oomrlRgC65EqiEoqtRFhBaJwUZA%3D%3D"
    },
    {
      fileName: "IMG_3162.JPG",
      text: "20 x 20 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2FIMG_3162.JPG?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=Z6JFDuFT8Ht4S5W0HL88ftL1ksanKsFnsE8RvB%2FTSid0FVVgVRXFnlvTvgZjVCfFQFTf0IWKDWB5NR6YiULk95pYzLpXomhMd0KEzM2j0Up3VTTyMFcEmRf6kjy1to4unUunWd0fL%2BrypByhml4xZ%2Bhi2fhvjsJPUhpFIkeLBnyW19qcMzD7rkA2IFgyHjpP1Em9kf65lh1ALCGK296wnu1sw7TlTQSFwT%2FcHiItOwU%2BOQLlrwckKMX0mdJFj3vR80h%2F5MrH28Gj3PCbqpcC9rDnNs9ZNC33%2FtGRVyLVdrWDpPCWgP6VgBJf4zC5yt72a8KBZQvPuUr2lofcqmNulA%3D%3D"
    },
    {
      fileName: "gook-hwa.jpg",
      text: "20 x 25 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2Fgook-hwa.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=ebtjaCzw%2BxkL2J74aKVqsXnnkSxP7UTrRPMmy3kdusB1Tby6Wx38ICKe%2BCu%2BIIAnoDvzn61Y1Fb%2FLSpDy%2Fkc7GWz5dvtbUe93vpVvxdQ6guy1CCvJak81JNiSOuxepqSHzRnmkdlX5lFXngG8uq2bLOGFP2reOuXQuiMtxuGoofxW9QJ5jP62IOaP1VKuPrnacO2sYs2mKNn52cVa6ONDB1P8taEB6Edz5vcLm5Teb%2F%2F1l1Y9CQRE5x5oRq91bZPYCNpgD%2BKw8RzDaKH%2FJz%2BEtz%2BewvwEilOI9HytsRzwdTVZ9XIBa%2B1MC52K9z8ios5gXlPEPIsC4CZQruynrROWw%3D%3D"
    },
    {
      fileName: "moran.JPG",
      text: "20 x 25 cm, acrylic on canvas",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/painting%2Fmoran.JPG?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=oej%2BjfysM7HkHAKQIcd%2BJT1PoDmos24W90a%2F4i7cawrLJuqBJiyXCpT64zyz62Pl2cNZmyKqT4SDD8j61dPJMXOOafdDc0iyc8Zc0C8A0Z7stsONs19vpuIWs0cHC26wDSIrWLJ%2FBje11wbPOiYy9COd0%2BoK%2BUX97mVENuwJcffYtX637lHaPsAcyQGMv8x0SkHLwCmFAosU%2F0QG5rCqfDzk0P5N6ERhkOFvMn9hMaLYhUHeRnYiB49JoybGCtyIDAbK8jvIMqUHBy%2B0QlqT1RitMzpo0m6VbPb1DsSNvJAXRin1XaolRF5eo9%2BB9Gn%2FVrAj6VlYuy4FXKhqfWB10Q%3D%3D"
    }
  ],
  "illustration": [
    {
      fileName: "Scan7_800t.jpg",
      text: "15 x 22 cm, pen",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/illustration%2FScan7_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=hWJlOx3RJj0S0ceOxZ3Gjde0%2FKtv4yOUbaEx8o6bmMNFHjI0ccRHNyCTR%2FUZMC32519k2Go65nFmYUyZJZpI%2FskhJ%2F5hJKo1VlKlIekttJcfe%2BHsRuvbJbLWzTGhjms218YvvAII0ORatR9%2F3verYbhymPagwWvGS44BcfGJSNtp7SDXphHX85p1v8K0jOKb21pBisO5dah7yeUeGv85zM57aBR4MbfiT18YcplNiN1jbpbJgOrO1wlWi4ew6EDAQcWZoo5yKxXMo0kLKX7fPc52ZupTFV%2BztTyD6SinsrmqAdmrKDP1XcRF5kfWG7i6hL%2BNK3m%2BzyaAAZzCFOALzw%3D%3D"
    },
    {
      fileName: "ScanSeoYooGi1t_800t.jpg",
      text: "15 x 22 cm, pen",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/illustration%2FScanSeoYooGi1t_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=Ym9SfXYNDc%2Fcfy%2FiEQ2EmV%2BxhmelzWKl1jxYd%2FTTWOuVh%2BndNOI6F2%2BTeK28XxycRJ78WG8yeqli8BysX1PoAy13xFFiIH9WxzR95MU4XTeMPxM3jR0XewmIUCAqsMerBu9BbRJmUKzHW%2FyTqfGeqvavkb8OoHCWaH2AgNWPp0RBrgiHLpFG3K0AyB7LNVrJgQZAOZEn3Dol7HnfKcOjq0%2BjXbv5JPEw3ACYM8PaI3ShiL5Wci5Ki9LhM3U5FBnxTtX0iBRYUJs1YuPc2qtbFf8ZS6KT%2Bx7sm4%2FIQiXnei4XsoaTGXHnnbf4%2FxWhwhvSwtk9nR5gq54ifViDrqj92w%3D%3D"
    },
    {
      fileName: "ScanBook1t_800t.jpg",
      text: "15 x 22 cm, pencil",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/illustration%2FScanBook1t_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=SwM%2BO9YZ2aH5KlPliE8ip4IFNMx2rZZFLtiS0E1ur7tYJTzoPzCdUTojRwwouvIAhrFURvcIPudLmv08fPE35THebwVqGvHAtnjJ%2FdgUa6CRGHUA5MPcAD8Q2HcAI1a8akK1zbSVmpG1EbSDUIMW3nK4wpNZ20HREsmjolcNfkLV%2Bhmb9ntuSforbYDoznVgbf5og4Y98SXegf1%2B63dLqJrvCL%2BqdW7wBNPZL8lRdyE2R5hWAAjsvBuq03pGCOaviCFP0zlPlvL9pMNbXnLRNKo3G0aVUEwAzpIzcDxs2tO17vM7pWvfHIIc06YrMKrxWtyNMuZRFcvH91gBm9AsaA%3D%3D"
    },
    {
      fileName: "ScanBook2t_800t.jpg",
      text: "15 x 22 cm, pencil",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/illustration%2FScanBook2t_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=FcKgO535HDmo2EA0wY5uwh0MWA9F5kKGwVFddAWkMGTj1vLRvp5hwSF48LPF5xZyIL5hywEtK9kdu4402YJFcNxWfhagHam3nW5Dw5v8ne1jaMAq4UCoIpxplpbPdcvpHhGtEyoGfBfN6VFQyj4pJuey%2FGvXajWmYVMaIxNuncwiIE1ilrCwmcdp3m2V4ZD%2BBqVfBywxYn9qfK0erGpqdzM9SUvCJihjsEAYvVd%2BjsGQ8Ld6GQPH5T0t35jrrVci3QT3CxtZ5H1WOiL69l%2FVisMHKe2kIuLOcB3%2B8%2FLZj89oPZNyeorJO4V5q92LIzVNZA3phMMJjTt6%2Bxu2ozovLg%3D%3D"
    },
    {
      fileName: "ScanExhibit3t_800t.jpg",
      text: "52 x 34.5 cm, pen",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/illustration%2FScanExhibit3t_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=aPpZ9%2FHZpzkjYppvXpOIKsx5UXPKj0r5yI%2FPC5BuSJoDBK67ocHKD2yfmAH3Z7gewriWhL8hQVAUHrwVX6wJEwjtWF%2BnJVSinrKcgdbJTndddMH5R5awUMQH%2F%2ByguVc6s767US7goaCrDUq%2FHJX0Koma7fPo4ka%2FkjCsRaPpv78bXnvzRg%2FyeB4whg1G9OqI0ANeXOrL5JR39Io0rzEHUiPkV5kbByGI6XGhH4jgZ%2FfZOmLVWoAW8gAMmp77hjRe%2F3i2kGNRngjRd8JsXxAsbxrCJjBpvuY7iljXTIzOPq2b86SaxxtifNFL%2Bkv%2Ba61%2Bilz8VY%2BeYF%2BHucbz77Cx2w%3D%3D"
    },
    {
      fileName: "ScanExhibit1t_800t.jpg",
      text: "16 x 18 cm, acrylic on paper",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/illustration%2FScanExhibit1t_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=mMzZE2qVrOPujSqbx2AXfn8wsFsuEEMaz2F1pX7zW%2BUjoAMNpodIV3071K95U%2B6cPHsXfMrwF30A61nhpJy58u%2FliNfXzoeMrgtyeaScbejwfdhe9ey3HG4yGrcPXxJzhx21YxaUgEd2kbukFlo9UMSwi01%2BU%2BMXmlaZP4iGw5uMyDgChzIawxmtUwmfKunF9poToveKYaL9xvvHpDhqgb8lmf%2Fs29LHoG6HW4wL9jIj9wIjo4WB7SjVZbksDhu7ClWea%2FvN91EvKLv67Lb4pyXwiHbkXVmypV5gIG84HPqosD7oj5aP3YmTXJaX8A2pvyKFwgGS7IgmSPkwhzRrpA%3D%3D"
    },
    {
      fileName: "ScanExhibit2t_800t.jpg",
      text: "acrylic on paper",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/illustration%2FScanExhibit2t_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=mf8d%2F0SjLqCO9ALUCC6CWxIk8K4MXo8fDCWiOQWFnc%2Bjnz%2BHSouxC1E6k5DL8woXLvX%2BX9pB%2F69ZhLye4iUeFJ0s2byAdRrB7pGbbvQC5ytvipFVUdYoCrwlxns%2F7%2FKjEQsWVN%2FXOwMXBuaq%2FDYWDTRhfrupFqJUXRo%2BXq1If1MDDUdIoaIgClaHhpNvhX7yK%2FJ%2FH4%2BmmTr2qUyyH3yu0tq7WVLRLBEtEVbLuH2B%2BO%2F31iNk0NRYIfmgj%2B5rqcC9PwlpKTxPlpR5kRrXUKyBUIt2Vf3tzoZU2T1SuBA6mR%2FpnQGJ%2Bt1UNBDau8ms09ujrvHmOmk1Y%2Fe9p7l4n9%2BtFQ%3D%3D"
    },
    {
      fileName: "ScanNewYearsCard1t_800t.jpg",
      text: "New year card",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/illustration%2FScanNewYearsCard1t_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=GUtJzt4GMu0Ehc%2BXhGwo7%2FP2h8wvr8O5Cck8myTqcSVQ1yJ6%2BuxC8c2bqAyk7Sqv1VTcPLPDBiyYCTur604BSflZszsuPeRmtJ5X9JdtEmj%2FKMqLZ2Y0UCQSPBYLASREa4gbbjouAZyP7x5MNrROyj3Pd8dYSxzUZFKgWMYsV7j5DY14L7jNan1UCnb7F35Cmb0bDeAT%2Fs9xerwBukeljPlaj1yVUw8hQEBE3ezy7K0DkA506%2Fo%2FIZ8ZRB%2F6EQjJfUAjbqNPYw8rrYB6pAAK3Ny4YMCbLWKP2R9vBNIfUNSaFcCu58rRsQQxSkKg8L%2FBRNbJM85GVTzyvXEi99Iumg%3D%3D"
    },
    {
      fileName: "ScanNewYearsCard2t_800t.jpg",
      text: "New year card",
      url: "https://storage.googleapis.com/joanne-lee.appspot.com/illustration%2FScanNewYearsCard2t_800t.jpg?GoogleAccessId=firebase-adminsdk-djr6r@joanne-lee.iam.gserviceaccount.com&Expires=16730323200&Signature=J6XhKXTBdVy1p5bT1m88uOxqTCD68yWSpNE6iOpoCB7Gkuqx5YPFp4gSan%2FivKX3sH0d6kuJ1geqkoT7i0PdzNkgyN3HyfKGPM9KAJUrHxudCKbIUCCA8efWcHvlGNhTtXpK2RpoQx8h2X7OEQ3gxJ5Mo5DXyUJAJOfR70tpI9lT6RLCw%2B6avMr%2BRSVXW0AYbGhifdUVEs0zkCaVlzqzbPZ8NlJY0UI%2F%2B%2FLXuHa4C75hAmFP%2BTosD7w6HTfJYMp2uEYyKcBgwt1Zu7jfdpJrpeoa67nrdLdOoUcQYfzEK7JrSF79kCJkpZlRo%2Bz37zX6Jw9QGfIG04L5Dqr06fGD3w%3D%3D"
    }
  ]
}
*/
