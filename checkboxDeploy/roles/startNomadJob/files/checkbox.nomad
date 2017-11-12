job "Checkbox_Job" {

  datacenters = [ "dc1" ]

  group "default" {
    count = 1

    task "webservice" {
      driver = "raw_exec"

      resources {
        memory = 512
      }

      config {
        command = "/bin/bash"
        args    = ["/home/ubuntu/startserver.sh"]
      }
    }

  }

}